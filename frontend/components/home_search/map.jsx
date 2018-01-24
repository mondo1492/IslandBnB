import React from 'react';
import ReactDOM from 'react-dom';
import MarkerManager from '../../util/marker_manager';
import { withRouter } from 'react-router-dom';

class GoogleMap extends React.Component {
  componentDidMount() {
    const defaultBounds = {
      northEast: {lat: 37.873972, lng: -122.331297},
      southWest: {lat: 37.673972, lng: -122.531297}
    };
    this.props.updateRooms(defaultBounds);

    const searchMap = this.refs.searchMap;
    const mapOptions = {
      center: {lat: 37.773972,
      lng: -122.431297},
      zoom: 12,
      minZoom: 3
    };

    this.searchMap = new google.maps.Map(searchMap, mapOptions);
    const infowindow = new google.maps.InfoWindow();
    this.MarkerManager = new MarkerManager(this.searchMap, infowindow, this.handleMarkerClick.bind(this));

    // let input = document.getElementById('searchTextFieldHome');

    this.updateMap = () => {
      const response = this.searchMap.getBounds().toJSON();
      // const place = searchBoxHeader.getPlaces()[0];
      // const long = place.geometry.viewport["b"]["b"];
      // const latt = place.geometry.viewport["f"]["b"];
      // var pos = {lat: latt, lng: long};
      // this.searchMap.setCenter(pos, 14);
      this.formattedBounds = {
        northEast: {lat: response.north, lng: response.east},
        southWest: {lat: response.south, lng: response.west}
      };

      this.props.updateRooms(this.formattedBounds);
      // this.MarkerManager.updateMarkers(this.props.rooms);
    };
    let changeBed = document.getElementById('change-bed-number');
    // let changeLocation = document.getElementById('searchTextFieldHome');
    // let searchBoxHeader = new google.maps.places.SearchBox(changeLocation);
    google.maps.event.addListener(this.searchMap, 'bounds_changed', this.updateMap);


    changeBed.addEventListener('click', this.updateMap);
    // searchBoxHeader.addListener('places_changed', this.updateMap);
  }

  componentWillUpdate() {
    // this.props.updateRooms(this.props.bedParams);
    // this.MarkerManager.updateMarkers(this.props.rooms);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rooms !== this.props.rooms) {
      this.MarkerManager.updateMarkers(nextProps.rooms);
    }
  }

  handleMarkerClick(roomid) {
    this.props.history.push(`/rooms/${roomid}`);
  }

  render() {
    return (
      <div className="searchMap-container">
          <div className="searchMap" ref="searchMap"> Map </div>
      </div>
    );
  }
}
export default withRouter(GoogleMap);
