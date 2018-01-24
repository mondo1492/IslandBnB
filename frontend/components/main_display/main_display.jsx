import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

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
      <ul>
        { rooms.length === 0 ? nothingToDisplay : "" }
        {rooms.map((room, i) => (
          <li key={`room-${i}`}>
            <Link to={ room ? `/rooms/${room.id}` : "" }>
              <img src={ room ? `${room.pic_url}` : ""}
                height="400"
                width="400">
              </img>
            </Link>
            <h4>${ room ? room.price : "" } { room ? room.title : "" } </h4>
            <h5>{ room ? room.room_type : "" } · { room ? room.beds : "" } beds</h5>
            <ReactStars className="react-stars" count={5} size={10} color2={'#00BEC5'} value={room ? room.review_rating : 0} edit={false} />
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
