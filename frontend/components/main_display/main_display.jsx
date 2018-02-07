import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import MarkerManager from '../../util/marker_manager.js';

class MainDisplay extends React.Component {
  nothingToDisplay() {
    return(
      <div className="nothing-to-display">
        <h2>No results</h2>
        <h3>Try adjusting your search. Here are some ideas:</h3>
          <ul>
            <li>Change your filters</li>
            <li>Zoom out on the map</li>
            <li>Search for a specific city, country, or destination</li>
          </ul>
        <button className="reset-button" onClick={() => this.props.resetFilters()}>
          <div className="reset-button-text">
            Remove all filters
          </div>
        </button>
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
          <li key={`room-${i}`} data-room={ room ? room.id : ""} data-listenerAdded={false}>
            <Link to={ room ? `/rooms/${room.id}` : "" }>
              <img src={ room ? `${room.pic_url}` : ""}
                height="400"
                width="400">
              </img>
            </Link>
            <h5 className='room-description-1'>{ room ? room.room_type.toUpperCase() : "" } · { room ? room.beds : "" } BEDS</h5>
            <h4 className='room-description-2'>{room ? room.title : "" } </h4>
            <h5 className='room-description-3'>From ${ room ? room.price : "" } per night</h5>
            <div className='stars-count-host'>
              <ReactStars className="react-stars" count={5} size={10} color2={'#008489'} value={room ? room.review_rating : 0} edit={false} />
              <h5 className='room-description-4'>&nbsp;{ room ? room.review_count : "" }</h5>
              <h5 className='room-description-4'>&nbsp;· {room ? room.host_name : "" }</h5>
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
