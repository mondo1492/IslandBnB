import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Header from '../header.jsx';
import Modal from 'react-modal';
import MarkerManager from '../../util/marker_manager';
import MainDisplayContainer from '../main_display/main_display_container';
import { Range } from 'rc-slider';
import { ReactiveBase, NumberBox, RangeSlider } from '@appbaseio/reactivesearch';
import ReactDOMServer from 'react-dom/server';

const STYLING = require('./gmap_style.jsx');

class Search extends React.Component {
  constructor(props){
    super(props);
    const storedBedMin =  parseInt(localStorage.getItem('bed_min'));
    const storedPriceMin = parseInt(localStorage.getItem('price_min'));
    const storedPriceMax = parseInt(localStorage.getItem('price_max'));
    const storedGuestMin = parseInt(localStorage.getItem('guest_min'));

    this.state = {
      bed_params: { min: storedBedMin ? storedBedMin : 0, max: 50},
      bed_min: storedBedMin ? storedBedMin : 0,
      price_params: { min: storedPriceMin ? storedPriceMin : 0, max: 10000},
      price_min: storedPriceMin ? storedPriceMin : 0,
      price_max: storedPriceMax ? storedPriceMax : 10000,
      guest_params: { min: storedGuestMin ? storedGuestMin : 1, max: 50},
      guest_min: storedGuestMin ? storedGuestMin : 1,
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
      toggler: null,
      bounds: {
        northEast: {lat: 37.873972, lng: -122.331297},
        southWest: {lat: 37.673972, lng: -122.531297}
      }
    };
    this.clear = this.clear.bind(this);
    this.apply = this.apply.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
    this.openModal1 = this.openModal1.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.openModal3 = this.openModal3.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  savePresets() {
    localStorage.setItem('bed_min', this.state.bed_params.min);
    localStorage.setItem('price_min', this.state.price_params.min);
    localStorage.setItem('price_max', this.state.price_params.max);
    localStorage.setItem('guest_min', this.state.guest_params.min);
  }

  componentDidMount() {
    this.updateRooms();
    const searchMap = this.refs.searchMap;
    const mapOptions = {
      center: {lat: 0,
      lng: -20},
      zoom: 2,
      minZoom: 2,
      styles: STYLING.GMAPSTYLE
    };
    this.searchMap = new google.maps.Map(searchMap, mapOptions);
    const infowindow = new google.maps.InfoWindow({
      maxWidth: 300,
      pixelOffset: new google.maps.Size(0, -12)
    });

    google.maps.event.addListener(infowindow, 'domready', function () {
       $('#main-infoWindow').closest('.gm-style-iw').parent().addClass('custom-iw');
     });

    this.MarkerManager = new MarkerManager(this.searchMap, infowindow, this.handleMarkerClick.bind(this));

    let input = document.getElementById('searchTextFieldHome');

    this.updateMap = () => {
      const response = this.searchMap.getBounds().toJSON();
      const formattedBounds = {
        northEast: {lat: response.north, lng: response.east},
        southWest: {lat: response.south, lng: response.west}
      };
      this.setState({bounds: formattedBounds}, () => { this.updateRooms()});
    };

    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(0, 0),
      new google.maps.LatLng(0, 0)
    );
    let searchOptions = {
      bounds: defaultBounds,
      radius: '20000',
      types: ['(regions)']
    };

    let autocomplete = new google.maps.places.Autocomplete(input, searchOptions);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.searchMap.setCenter(autocomplete.getPlace().geometry.location);
      this.searchMap.setZoom(9);
    });
    google.maps.event.addListener(this.searchMap, 'bounds_changed', this.updateMap);
  }

  componentWillReceiveProps(nextProps) {
    this.MarkerManager.updateMarkers(nextProps.entities);
  }

  handleMarkerClick(roomid) {
    console.log(roomid);
    this.props.history.push(`/rooms/${roomid}`);
  }


  openModal1() {
    this.setState({ modalOpen1: true });
  }
  openModal2() {
    this.setState({ modalOpen2: true });
  }
  openModal3() {
    this.setState({ modalOpen3: true });
  }

  clear() {
    this.setState({
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
      bed_min: this.state.bed_params.min,
      guest_min: this.state.guest_params.min,
      price_min: this.state.price_params.min,
      price_max: this.state.price_params.max,
    });
  }

  apply() {
    this.setState({
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
      bed_params: Object.assign(this.state.bed_params, { min: this.state.bed_min}),
      guest_params: Object.assign(this.state.guest_params, { min: this.state.guest_min }),
      price_params: Object.assign(this.state.price_params, { min: this.state.price_min, max: this.state.price_max})
    }, () => this.savePresets());
    this.updateRooms(this.state.bounds);
  }

  updateRooms() {
    const beds = this.state.bed_params;
    const prices = this.state.price_params;
    const guest = this.state.guest_params;
    const filter = this.state.bounds;
    filter["bed_params"] = { min: beds.min, max: beds.max};
    filter["price_params"] = { min: prices.min, max: prices.max};
    filter["guest_params"] = { min: guest.min, max: guest.max};
    this.props.getAllRooms(filter).then(()=>{this.addListeners();});
  }

  updatePrice(price) {
    return this.setState({ price_min: price[0], price_max: price[1]});
  }

  updateGuest(min_guests) {
    return this.setState({ guest_min: min_guests });
  }

  updateBed(min_beds) {
    return this.setState({ bed_min: min_beds });
  }

  toggleSelected(item) {
    if (this.state.toggler !== null) {
      if (this.state.toggler.roomId !== item.dataset.room) {
        this.MarkerManager.updateMarkers3(this.state.toggler);
        let currentMarker = this.MarkerManager.updateMarkers2(item.dataset.room);
        this.setState({toggler: currentMarker});
      }
    } else {
      let currentMarker = this.MarkerManager.updateMarkers2(item.dataset.room);
      this.setState({toggler: currentMarker});
    }
  }

  untoggleSelected() {
    this.MarkerManager.updateMarkers3(this.state.toggler);
    this.setState({toggler: null});
  }

  addListeners() {
    let ul = document.getElementById('room-li');
    let items = ul.getElementsByTagName('li');


    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset.listeneradded === 'false') {
        items[i].addEventListener('mouseenter', () => this.toggleSelected(items[i]));
        items[i].addEventListener('mouseleave', () => this.untoggleSelected(items[i]));
        items[i].dataset.listeneradded = true;
      } else {
        items[i].removeEventListener('mouseleave', () => this.untoggleSelected(items[i]));
        items[i].removeEventListener('mouseenter', () => this.toggleSelected(items[i]));
      }
    }
  }

  componentWillUpdate() {
    this.addListeners();
  }


  componentWillUnmount() {
    this.savePresets();
  }

  priceDisplay() {
      if (this.state.price_min === 0 && this.state.price_max < 10000) {
        return `Up to $${this.state.price_max}`;
      } else if (this.state.price_min > 0 && this.state.price_max < 10000) {
        return `$${this.state.price_min} - $${this.state.price_max}`;
      } else if (this.state.price_min > 0 && this.state.price_max === 10000) {
        return `$${this.state.price_min}+`;
      } else {
        return `Price`;
      }
    }

  searchParameters() {
    const bedMin = this.state.bed_min;
    const guestMin = this.state.guest_min;
    const priceMin = this.state.price_min;
    const priceMax = this.state.price_max;
    return(
      <div>
      <div className="search-params-container">
        <ul>
          <li>
            <button className={ bedMin === 0 ? "filter-button" : "filter-button-selected"} onClick={this.openModal1}>
              <div className="filter-button-text">
                {`${bedMin}+`} {bedMin === 1 ? 'Bed' : 'Beds'}
              </div>
            </button>
            <Modal
                isOpen={this.state.modalOpen1}
                onRequestClose={this.clear}
                className="modal-beds"
                overlayClassName="modal-overlay"
                contentLabel="auth_form">
                <ReactiveBase app='bnb' credentials='none'>
                  <div className='bed-content'>
                    <NumberBox
                      componentId="NumberBoxSensor"
                      dataField="guests"
                      data={{ label: "Beds", start: 0, end: 50 }}
                      defaultSelected={bedMin}
                      onValueChange={(data)=>{this.updateBed(data);}}
                      />
                    <div className='bed-buttons'>
                      <div className="cancel" onClick={this.clear}>Clear</div>
                      <div className="apply" onClick={this.apply}>Apply</div>
                    </div>
                  </div>
                </ReactiveBase>
              </Modal>
          </li>
          <li>
            <button className={ guestMin === 1 ? "filter-button" : "filter-button-selected"} onClick={this.openModal2}>
              <div className="filter-button-text">
                {guestMin} {guestMin === 1 ? 'Guest' : 'Guests'}
              </div>
            </button>
            <Modal
                isOpen={this.state.modalOpen2}
                onRequestClose={this.clear}
                className="modal-guests"
                overlayClassName="modal-overlay"
                contentLabel="auth_form">
                <ReactiveBase app='bnb' credentials='none'>
                  <div className='bed-content'>
                    <NumberBox
                      componentId="NumberBoxSensor"
                      dataField="guests"
                      data={{ label: "Guests", start: 1, end: 50 }}
                      defaultSelected={guestMin}
                      onValueChange={(data)=>{this.updateGuest(data);}}
                      />
                    <div className='bed-buttons'>
                      <div className="cancel" onClick={this.clear}>Clear</div>
                      <div className="apply" onClick={this.apply}>Apply</div>
                    </div>
                  </div>
                </ReactiveBase>
              </Modal>
          </li>
          <li>
            <button className={ (priceMin === 0 && priceMax === 10000) ? "filter-button" : "filter-button-selected"} onClick={this.openModal3}>
              <div className="filter-button-text">
                {this.priceDisplay()}
              </div>
            </button>
            <Modal
                isOpen={this.state.modalOpen3}
                onRequestClose={this.clear}
                className="modal-price"
                overlayClassName="modal-overlay">
                  <div className='modal-price-display'>
                    {`$${priceMin} - $${priceMax === 10000 ? `10000+` : priceMax}`}
                  </div>
                  <div className='bed-content'>
                  <Range
                    min={0}
                    max={10000}
                    className='range-slider'
                    defaultValue={[priceMin, priceMax]}
                    tipFormatter={ value => `$${value}`}
                    onChange={(value)=>{this.updatePrice(value)}}
                  />
                  <div className='bed-buttons'>
                    <div className="cancel" onClick={this.clear}>Clear</div>
                    <div className="apply" onClick={this.apply}>Apply</div>
                  </div>
                </div>
              </Modal>
          </li>
        </ul>
      </div>
      </div>
    );
  }
resetFilters() {
  this.setState({
    price_min: 0,
    price_max: 10000,
    bed_min: 0,
    guest_min: 1
  }, () => this.savePresets());
}



render() {
  return(
    <div>
      <Header/>
      {this.searchParameters()}
      <div className='rooms-map-main-container'>
        <MainDisplayContainer resetFilters={this.resetFilters} />
          <div className="searchMap-container">
              <div className="searchMap" ref="searchMap"> Map </div>
          </div>
      </div>
    </div>
  );
}
}

export default Search;
