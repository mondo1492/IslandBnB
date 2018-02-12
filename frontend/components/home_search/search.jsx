import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Header from '../header.jsx';
import MarkerManager from '../../util/marker_manager';
import MainDisplayContainer from '../main_display/main_display_container';
import * as LSHelper from './local_storage_helper';
import Filters from './filters';

const STYLING = require('./gmap_style.jsx');

class Search extends React.Component {
  constructor(props){
    super(props);
    const { bedMin, priceMin, priceMax, guestMin } = LSHelper.presets();
    this.state = {
      params: {
        bedParams: { min: bedMin ? bedMin : 0, max: 50},
        priceParams: { min: priceMin ? priceMin : 0, max: priceMax ? priceMax : 1000},
        guestParams: { min: guestMin ? guestMin : 1, max: 50}
      },
      changeParams: {
        bedMin: bedMin ? bedMin : 0,
        priceMin: priceMin ? priceMin : 0,
        priceMax: priceMax ? priceMax : 1000,
        guestMin: guestMin ? guestMin : 1
      },
      toggler: null,
      noFiltersApplied: true,
      bounds: {
        northEast: {lat: 37.873972, lng: -122.331297},
        southWest: {lat: 37.673972, lng: -122.531297}
      }
    };
    this.clearChange = this.clearChange.bind(this);
    this.applyChange = this.applyChange.bind(this);
    this.cancelChange = this.cancelChange.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.updateBed = this.updateBed.bind(this);
    this.updateGuest = this.updateGuest.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.noFiltersApplied = this.noFiltersApplied.bind(this);
  }

  componentDidMount() {
    this.updateRooms();
    const searchMap = this.refs.searchMap;
    const mapOptions = {
      center: { lat: 14.540111,
      lng: -74.967637},
      zoom: 4,
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
    google.maps.event.addListener(this.searchMap, 'idle', this.updateMap);
  }

  componentWillReceiveProps(nextProps) {
    this.MarkerManager.updateMarkers(nextProps.entities);
  }

  componentWillUpdate() {
    this.addListeners();
  }

  componentWillUnmount() {
    LSHelper.savePresets(this.state.params);
  }

  handleMarkerClick(roomid) {
    this.props.history.push(`/rooms/${roomid}`);
  }

  clearChange(filterType) {
    switch (filterType) {
      case "bedCount":
        this.updateBed(0);
        break;
      case "guestCount":
        this.updateGuest(1);
        break;
      case "priceAmount":
        this.updatePrice([0, 1000]);
        break;
    }
  }

  noFiltersApplied() {
    return (
      this.state.params.bedParams.min === 0 &&
      this.state.params.priceParams.min === 0 &&
      this.state.params.priceParams.max === 1000 &&
      this.state.params.guestParams.min === 1
    );
  }

  cancelChange(modalType) {
    this.setState({
      changeParams: Object.assign({}, this.state.changeParams, {
        bedMin: this.state.params.bedParams.min,
        guestMin: this.state.params.guestParams.min,
        priceMin: this.state.params.priceParams.min,
        priceMax: this.state.params.priceParams.max
      })
    });
  }

  applyChange(modalType) {
    this.setState({
      params: Object.assign({}, this.state.params, {
        bedParams: Object.assign({}, this.state.params.bedParams, { min: this.state.changeParams.bedMin}),
        guestParams: Object.assign({}, this.state.params.guestParams, { min: this.state.changeParams.guestMin }),
        priceParams: Object.assign({}, this.state.params.priceParams, { min: this.state.changeParams.priceMin, max: this.state.changeParams.priceMax})
      })
    }, () => this.updateRooms(this.state.bounds));
    ;
  }

  updateRooms() {
    LSHelper.savePresets(this.state.params);
    const { bedParams, priceParams, guestParams } = this.state.params;
    const maxPrice = priceParams.max === 1000 ? 1000000 : priceParams.max;
    const filter = this.state.bounds;
    filter["bed_params"] = { min: bedParams.min, max: bedParams.max };
    filter["price_params"] = { min: priceParams.min, max: maxPrice };
    filter["guest_params"] = { min: guestParams.min, max: guestParams.max };
    this.props.getAllRooms(filter).then(() => { this.addListeners() });
  }

  updatePrice(price) {
    this.setState({
      changeParams: Object.assign({}, this.state.changeParams, {
        priceMin: price[0],
        priceMax: price[1]
      })
    });
  }

  updateGuest(min_guests) {
    this.setState({
      changeParams: Object.assign({}, this.state.changeParams, { guestMin: min_guests })
    });
  }

  updateBed(min_beds) {
    this.setState({
      changeParams: Object.assign({}, this.state.changeParams, { bedMin: min_beds })
    });
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
    this.setState({ toggler: null });
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

  resetFilters() {
    this.setState({
      changeParams: Object.assign({}, this.state.changeParams, {
        priceMin: 0,
        priceMax: 1000,
        bedMin: 0,
        guestMin: 1
      }),
      params: Object.assign({}, this.state.params, {
        bedParams: { min: 0, max: 50},
        priceParams: { min: 0, max: 1000},
        guestParams: { min: 1, max: 50}
      }),
    }, () => this.updateRooms());
  }

  render() {
    return (
      <div>
        <Header/>
          <Filters
            updateRooms={this.updateRooms}
            params={this.state.params}
            changeParams={this.state.changeParams}
            priceMin={this.state.changeParams.priceMin}
            priceMax={this.state.changeParams.priceMax}
            cancelChange={this.cancelChange}
            updateBed={this.updateBed}
            updateGuest={this.updateGuest}
            applyChange={this.applyChange}
            updatePrice={this.updatePrice}
            clearChange={this.clearChange}
            resetFilters={this.resetFilters}
            noFiltersApplied={this.noFiltersApplied}
          />
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
