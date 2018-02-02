import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import MarkerManager from '../../util/marker_manager.js';

class MainDisplay extends React.Component {
  nothingToDisplay() {
    return(
      <div>
        <h2>Oops! No rooms in search area or search criteria</h2>
      </div>
    );
  }

  allRooms() {
    const rooms = this.props.entities ? this.props.entities : [];
    const nothingToDisplay = this.nothingToDisplay();
    return(
      <ul id='room-li'>
        { rooms.length === 0 ? nothingToDisplay : "" }
        {rooms.map((room, i) => (
          <li key={`room-${i}`} data-room={room.id} data-listenerAdded={false}>
            <Link to={ room ? `/rooms/${room.id}` : "" }>
              <img src={ room ? `${room.pic_url}` : ""}
                height="400"
                width="400">
              </img>
            </Link>
            <h5>{ room ? room.room_type : "" } · { room ? room.beds : "" } beds</h5>
            <h4>{room ? room.title : "" } </h4>
            <h5>From ${ room ? room.price : "" } per night</h5>
            <div className='stars-count-host'>
              <ReactStars className="react-stars" count={5} size={10} color2={'#00BEC5'} value={room ? room.review_rating : 0} edit={false} />
              <h5>&nbsp;{ room ? room.review_count : "" }</h5>
              <h5>&nbsp;· {room ? room.host_name : "" }</h5>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render(){
    const displayAllRooms = this.allRooms();
    return(
      <div className="display-all-rooms-container">
        <div className="display-all-rooms">
          {displayAllRooms}
        </div>

      </div>
    );
  }
}

export default MainDisplay;
