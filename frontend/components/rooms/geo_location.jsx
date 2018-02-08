import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
class GeoLocation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mapOptions: {
        center: {
          lat: 37.773972,
          lng: -122.431297
        },
        zoom: 12
      }
    }
    this.marker = new google.maps.Marker({ position: null,map: null });
  }

  componentWillReceiveProps(nextProps) {
    this.setMarkerAndCenter(new google.maps.LatLng(nextProps.lat, nextProps.lng));
  }

  componentDidMount() {
     this.createRoomMap = new google.maps.Map(this.refs.map, this.state.mapOptions);
     let input = document.getElementById('searchTextField');
     let searchBox = new google.maps.places.Autocomplete(input);
     this.registerListeners(searchBox);
  }

  registerListeners(searchBox) {
    let self = this;
    google.maps.event.addListener(searchBox, 'place_changed', () => {
      let place = searchBox.getPlace();
      let location = place.geometry.location;

      self.props.updateGeoLocation({
        lat: location.lat(),
        lng: location.lng(),
        address: place.formatted_address
        });

      this.setMarkerAndCenter(location);
    });
  }

  setMarkerAndCenter(location) {
    this.createRoomMap.setCenter(location, 14);
    this.marker.setMap(null);
      this.marker = new google.maps.Marker({
      position: location,
      map: this.createRoomMap
    });
  }
  render() {
    return (
      <div>
        <div className="map" ref="map"> Map </div>
      </div>
    );
  }

}
export default withRouter(GeoLocation);

//Defunct for now, trouble to get working correctly
// getCurrentLocation() {
//   navigator.geolocation.getCurrentPosition((position)=>{
//     return {lat: position.coords.latitude, lng: position.coords.longitude};
//   });
// }
