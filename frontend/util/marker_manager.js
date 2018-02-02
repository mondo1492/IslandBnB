import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

export default class MarkerManager {
  constructor(map, infowindow, handleClick) {
    this.map = map;
    this.markers = {};
    this.removeMarker = this.removeMarker.bind(this);
    this.infowindow = infowindow;
    this.handleClick = handleClick;
  }

  updateMarkers(rooms) {
    console.log(this.markers);
    const roomsObj = {};


    rooms.forEach((room) => {
      roomsObj[room.id] = room;
    });

    rooms
      .filter(room => !this.markers[room.id])
      .forEach((newRoom) => {
      this.createMarkerFromRoom(newRoom, this.infowindow, this.handleClick);
    });
    Object.keys(this.markers)
      .filter(roomId => !roomsObj[roomId])
      .forEach((roomId) => this.removeMarker(this.markers[roomId]));
  }

  updateMarkers2(roomId) {
    let currentMarker = this.markers[roomId];
    this.removeMarker(this.markers[roomId]);
    this.createMarkerFromMarker(currentMarker);
    return currentMarker;
  }

  updateMarkers3(marker) {
    if (this.markers[marker.roomId]) {
      this.removeMarker(marker);
      this.createMarkerFromMarker2(marker);
    }
  }

  createMarkerFromMarker2(currentMarker) {
    console.log(currentMarker.label);
    const marker = new google.maps.Marker({
      position: currentMarker.position,
      map: this.map,
      label: {text: currentMarker.label.text, color: "black"},
      icon: 'http://res.cloudinary.com/dluh2fsyd/image/upload/v1500947278/gmap_icon_b2iudh.png',
      // animation: google.maps.Animation.DROP,
      roomId: currentMarker.roomId
    });
    this.markers[marker.roomId] = marker;
  }

  createMarkerFromMarker(currentMarker) {
    console.log(currentMarker.label);
    const marker = new google.maps.Marker({
      position: currentMarker.position,
      map: this.map,
      label: {text: currentMarker.label.text, color: "white"},
      icon: 'http://res.cloudinary.com/dluh2fsyd/image/upload/v1517524135/gmap_icon_b2iudh2_c0q1rp.png',
      // animation: google.maps.Animation.DROP,
      roomId: currentMarker.roomId
    });
    this.markers[marker.roomId] = marker;
  }

  removeMarker(marker) {
      this.markers[marker.roomId].setMap(null);
      delete this.markers[marker.roomId];
  }

  deleteSpecific(roomId) {
    delete this.markers[roomId];
  }

  createMarkerFromRoom(room, infowindow, handleClick) {
    const pos = new google.maps.LatLng(room.lat, room.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      label: {text: `$${room.price}`, color: "black"},
      icon: 'http://res.cloudinary.com/dluh2fsyd/image/upload/v1500947278/gmap_icon_b2iudh.png',
      // animation: google.maps.Animation.DROP,
      roomId: room.id
    });
    this.markers[marker.roomId] = marker;

    marker.addListener('click', function () {
      handleClick(room.id);
    });
    infowindow.addListener('click', function () {
      handleClick(room.id);
    });
    var contentString = '<div id="content">'+
      `<div id=room-${room.id}>`+
      '</div>'+
      `<img src=${room.pic_url} height="100px" width="150px"></img>` +
      `<h4 id="firstHeading" class="firstHeading">$${room.price} ${room.title}</h4>`+
      `<h5>${room.room_type} · ${room.beds} beds</h5>`+
      '<div id="bodyContent">'+
      '</div>'+
      '</div>';

    marker.addListener('mouseover', function () {
      infowindow.close();
      infowindow.setContent(contentString);
      infowindow.open(marker.map, marker);
    });

    marker.addListener('mouseout', function () {
      infowindow.close();
    });
  }

}



// import React from 'react';
//
// class MarkerManager {
//   constructor(map){
//     this.map = map;
//     this.markers = [];
//   }
//
//   updateMarkers(rooms){
//     rooms = rooms.length === 0 ? [] : rooms ;
//     rooms.forEach( room => (this.markers[room.id] = room));
//     const newMarkers = this.markers.filter((obj) =>  obj !== undefined );
//     // const newMarkers = this.markers.keys.forEach( room => (this.markers[room.id] = room));
//
//     newMarkers
//       .forEach((roomId) => this.removeMarker(newMarkers[newMarkers.roomId]));
//     rooms
//       .forEach( room => this.createMarkerFromRoom(room));
//
//     // Object.keys(this.markers)
//     //   .filter(roomId => !this.markers[this.markers.id])
//     //   .forEach((roomId) => this.removeMarker(this.markers[roomId]))
//   }
//
//   createMarkerFromRoom(room) {
//     const position = new google.maps.LatLng(room.lat, room.lng);
//       const marker = new google.maps.Marker({
//         position,
//         map: this.map,
//         roomId: room.id
//       });
//   }
//
//   removeMarker(marker) {
//     this.markers[marker.roomId].setMap(null);
//     delete this.markers[marker.roomId];
//   }
// }
//
// export default MarkerManager;
