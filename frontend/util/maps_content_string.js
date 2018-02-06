import { Link } from 'react-router-dom';
import React from 'react';
import ReactStars from 'react-stars';
import ReactDOMServer from 'react-dom/server';


export default class InfoWindowContent {
  addListener(handleClick, roomId) {
    console.log(handleClick);
    console.log("WORKING IN HERE");
    document.getElementsByClassName('gm-style-iw')[0].addEventListener('click', ()=> {
      handleClick(roomId);
    });
  }

  generateInfoWindowStars(starsLeft) {
    let stringBuilder = "";
    let full = '<span class="" data-index="4" data-forhalf="★" style="position: relative; overflow: hidden; cursor: default; display: block; float: left; color: rgb(0, 190, 197); font-size: 10px;">★</span>';
    let half = '<span class="react-stars-half" data-index="3" data-forhalf="★" style="position: relative; overflow: hidden; cursor: default; display: block; float: left; color: gray; font-size: 10px;">★</span>';
    let empty = '<span class="" data-index="4" data-forhalf="★" style="position: relative; overflow: hidden; cursor: default; display: block; float: left; color: gray; font-size: 10px;">★</span>'
    for (let i = 0; i < 5; i++) {
      if (starsLeft >= 1) {
        stringBuilder += full;
      } else if (starsLeft > 0 && starsLeft < 1) {
        stringBuilder += half;
      } else {
        stringBuilder += empty;
      }
      starsLeft -= 1;
    }
    return stringBuilder;
  }

  generateInfoWindowString(room) {
    return '<div id="main-infoWindow">'
      + '<div class="map-room-display">'
      + `<img src=${room.pic_url} height="200" width="100%"</img>`
      + `<div class='info-window-description'>`
      + `<div class='room-description-1'> ${room.room_type.toUpperCase()} · ${room.beds} BEDS</div>`
      + `<div class='room-description-2'>${room.title} </div>`
      + `<div class='room-description-3'>From $${room.price} per night</div>`
      + `<div class='info-window-description-rating'>`
      + this.generateInfoWindowStars(room.review_rating)
      + `<div class='room-description-4'>&nbsp;${room.review_count}</div>`
      + `<div class='room-description-4'>&nbsp;· ${room.host_name}</div>`
      + `</div>`
      + `</div>`
      + `</div>`
      + `</div>`;
    // return '<div id="main-infoWindow">'
    //   + '<div class="map-room-display">'
    //   + `<img src=${room.pic_url} height="200" width="100%"</img>`
    //   + `<div class='info-window-description'>`
    //   + `<h5 class='room-description-1'> ${room.room_type.toUpperCase()} · ${room.beds} BEDS</h5>`
    //   + `<h4 class='room-description-2'>${room.title} </h4>`
    //   + `<h5 class='room-description-3'>From $${room.price} per night</h5>`
    //   + `<div class='info-window-description-rating'>`
    //   + this.generateInfoWindowStars(room.review_rating)
    //   + `<h5 className='room-description-4'>&nbsp;${room.review_count}</h5>`
    //   + `<h5 className='room-description-4'>&nbsp;· ${room.host_name}</h5>`
    //   + `</div>`
    //   + `</div>`
    //   + `</div>`
    //   + `</div>`;
  }
}
