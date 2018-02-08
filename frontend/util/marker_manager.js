import { Link } from 'react-router-dom';
import React from 'react';
import ReactStars from 'react-stars';
import InfoWindowContent from './maps_content_string'
import ReactDOMServer from 'react-dom/server';


export default class MarkerManager {
  constructor(map, infowindow, handleClick) {
    this.map = map;
    this.markers = {};
    this.removeMarker = this.removeMarker.bind(this);
    this.infowindow = infowindow;
    this.handleClick = handleClick;
  }

  updateMarkers(rooms) {
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
    this.createMarkerFromMarker(currentMarker,this.infowindow, this.handleClick);
    return currentMarker;
  }

  updateMarkers3(marker) {
    if (this.markers[marker.roomId]) {
      this.removeMarker(marker);
      this.createMarkerFromMarker2(marker, this.infowindow, this.handleClick);
    }
  }

  createMarkerFromMarker2(currentMarker, infowindow, handleClick) {
    const marker = new google.maps.Marker({
      position: currentMarker.position,
      map: this.map,
      label: {text: currentMarker.label.text, color: "black"},
      icon: 'http://res.cloudinary.com/dluh2fsyd/image/upload/v1500947278/gmap_icon_b2iudh.png',
      // animation: google.maps.Animation.DROP,
      roomId: currentMarker.roomId,
      room: currentMarker.room
    });
    this.markers[marker.roomId] = marker;
    let infoWindowHelper = new InfoWindowContent();
    let room = currentMarker.room;

    marker.addListener('click', function () {
      infowindow.setContent(infoWindowHelper.generateInfoWindowString(room));
      infowindow.open(marker.map, marker);
      infoWindowHelper.addListener(handleClick, room.id);
    });
  }

  createMarkerFromMarker(currentMarker, infowindow, handleClick) {
    console.log(currentMarker.label);
    const marker = new google.maps.Marker({
      position: currentMarker.position,
      map: this.map,
      label: {text: currentMarker.label.text, color: "white"},
      icon: 'http://res.cloudinary.com/dluh2fsyd/image/upload/v1517524135/gmap_icon_b2iudh2_c0q1rp.png',
      roomId: currentMarker.roomId,
      room: currentMarker.room
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
      roomId: room.id,
      room: room
    });
    this.markers[marker.roomId] = marker;

    let infoWindowHelper = new InfoWindowContent();

    marker.addListener('click', function () {
      infowindow.setContent(infoWindowHelper.generateInfoWindowString(room));
      infowindow.open(marker.map, marker);
      infoWindowHelper.addListener(handleClick, room.id);
    });

    google.maps.event.addListener(this.map, 'click', () => {
      infowindow.close();
    });
  }

}
