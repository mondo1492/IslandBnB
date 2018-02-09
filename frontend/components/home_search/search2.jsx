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
import Filters from './filters';

const STYLING = require('./gmap_style.jsx');

class Search extends React.Component {
  constructor(props){
    super(props);
    const { bedMin, priceMin, priceMax, guestMin } = this.presets();
    this.state = {
      bedParams: { min: bedMin ? bedMin : 0, max: 50 },
      guestParams: { min: guestMin ? guestMin : 1, max: 50 },
      priceParams: { min: priceMin ? priceMin : 0, max: priceMax ? priceMax : 1000 },
      toggler: null,
      bounds: {
        northEast: {lat: 37.873972, lng: -122.331297},
        southWest: {lat: 37.673972, lng: -122.531297}
      }
    };
    this.updateRooms = this.updateRooms.bind(this);
  }

  presets() {
    return {
      bedMin: parseInt(localStorage.getItem('bedMin')),
      priceMin: parseInt(localStorage.getItem('priceMin')),
      priceMax: parseInt(localStorage.getItem('priceMax')),
      guestMin: parseInt(localStorage.getItem('guestMin'))
    }
  }

  savePresets() {
    localStorage.setItem('bedMin', this.state.bedParams.min);
    localStorage.setItem('priceMin', this.state.priceParams.min);
    localStorage.setItem('priceMax', this.state.priceParams.max);
    localStorage.setItem('guestMin', this.state.guestParams.min);
  }

  componentWillUpdate() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.savePresets();
  }

  componentDidMount() {
    this.updateRooms();
    const searchMap = this.refs.searchMap;
    const mapOptions = {
      center: {lat: 14.540111,
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

  handleMarkerClick(roomid) {
    this.props.history.push(`/rooms/${roomid}`);
  }

  updateRooms() {
    const { bedParams, priceParams, guestParams, filter } = this.state;
    const maxPrice = priceParams.max === 1000 ? 1000000 : priceParams.max;
    filter["bed_params"] = { min: bedParams.min, max: bedParams.max};
    filter["price_params"] = { min: priceParams.min, max: maxPrice};
    filter["guest_params"] = { min: guestParams.min, max: guestParams.max};
    this.props.getAllRooms(filter).then(()=>{this.addListeners();});
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

render() {
  return(
    <div>
      <Header/>
      <Filters
        updateRooms={this.updateRooms}
        state={this.state}
        cancelChange={this.cancelChange}
        openModal={this.openModal}
        updateBed={this.updateBed}
        applyChange={this.applyChange}
        updatePrice={this.updatePrice}
        clearChange={this.clearChange}
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
