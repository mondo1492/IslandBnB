import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
class GeoLocation extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {
    // set the map to show SF
     const map = this.refs.map;
    //  this.coords = this.getCurrentLocation();
     const mapOptions = {
       center: {lat: 37.773972,
       lng: -122.431297},
       zoom: 12
     };
     this.map = new google.maps.Map(map, mapOptions);
     let input = document.getElementById('searchTextField');
    // wrap the mapDOMNode in a Google Map
    // let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.Autocomplete(input);
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    this.registerListeners(searchBox, map);

  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position)=>{
      return {lat: position.coords.latitude, lng: position.coords.longitude};
    });
  }

  registerListeners(searchBox, map){
    let self = this;

    searchBox.addListener('places_changed', function() {
      // var latLon = google.maps.LatLngBounds();
      var place = searchBox.getPlaces()[0];
      const long = place.geometry.viewport["b"]["b"];
      const latt = place.geometry.viewport["f"]["b"];
      var pos = {lat: latt, lng: long};
      const mapOptions = {
        center: pos, // this is area 51
        zoom: 14
      };
      const mapRerender = new google.maps.Map(map, mapOptions);
      self.props.updateGeoLocation({
        lat: place.geometry.viewport["f"]["b"],
        lng: place.geometry.viewport["b"]["b"],
        address: place.formatted_address});
        var marker = new google.maps.Marker({
          position: pos,
          map: mapRerender,
        });
        self.map.setCenter(pos, 14);

    });

    // const x = google.maps.event.addListener(this.map, 'idle', () => {
    //   const { north, south, east, west } = this.map.getBounds().toJSON();
    //   const bounds = {
    //     northEast: { lat:north, lng: east },
    //     southWest: { lat: south, lng: west } };
    // });
    // const y = google.maps.event.addListener(this.map, 'click', (event) => {
    //   const coords = getCoordsObj(event.latLng);
    //   this.handleClick(coords);
    // });

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
//
// <div ref={ map => this.mapNode = map }>
//
// </div>

// function initAutocomplete() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -33.8688, lng: 151.2195},
//           zoom: 13,
//           mapTypeId: 'roadmap'
//         });
//
//         // Create the search box and link it to the UI element.
//         var input = document.getElementById('pac-input');
//         var searchBox = new google.maps.places.SearchBox(input);
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//         // Bias the SearchBox results towards current map's viewport.
//         map.addListener('bounds_changed', function() {
//           searchBox.setBounds(map.getBounds());
//         });
//
//         var markers = [];
//         // Listen for the event fired when the user selects a prediction and retrieve
//         // more details for that place.
//         searchBox.addListener('places_changed', function() {
//           var places = searchBox.getPlaces();
//
//           if (places.length == 0) {
//             return;
//           }
//
//           // Clear out the old markers.
//           markers.forEach(function(marker) {
//             marker.setMap(null);
//           });
//           markers = [];
//
//           // For each place, get the icon, name and location.
//           var bounds = new google.maps.LatLngBounds();
//           places.forEach(function(place) {
//             if (!place.geometry) {
//               return;
//             }
//             var icon = {
//               url: place.icon,
//               size: new google.maps.Size(71, 71),
//               origin: new google.maps.Point(0, 0),
//               anchor: new google.maps.Point(17, 34),
//               scaledSize: new google.maps.Size(25, 25)
//             };
//
//             // Create a marker for each place.
//             markers.push(new google.maps.Marker({
//               map: map,
//               icon: icon,
//               title: place.name,
//               position: place.geometry.location
//             }));
//
//             if (place.geometry.viewport) {
//               // Only geocodes have viewport.
//               bounds.union(place.geometry.viewport);
//             } else {
//               bounds.extend(place.geometry.location);
//             }
//           });
//           map.fitBounds(bounds);
//         });
//       }
