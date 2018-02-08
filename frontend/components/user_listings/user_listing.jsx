import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../header.jsx';
import Footer from '../front_page/front_footer.jsx';

class UserListings extends React.Component {
  constructor(props){
    super(props);
    this.state = { listing: [] };
  }

  componentWillMount() {
    this.props.getUserListings(this.props.currentUser.id);
    this.allRoomListed = this.allRoomListed.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.editRoom = this.editRoom.bind(this);
  }

  deleteRoom(e) {
    e.preventDefault();
    this.props.deleteRoom(e.currentTarget.value).then(
      () => this.setState(
        { listing: this.props.getUserListings(this.props.currentUser.id) }
    ));
  }

  editRoom(e) {
    e.preventDefault();
    this.props.history.push(`/edit/${e.currentTarget.value}`);
  }

  allRoomListed() {
    return(
      <ul className="trip-index">
        {this.props.entities.reverse().map((room, i) => (
          <li key={`room-${i}`}>
            <div className="trip-item">
              <img src={ room.pic_url ? room.pic_url : "" }></img>
              <div className='trip-item-details'>
                <span>{ room.address ? room.address : "" }</span>
                <ul>
                  <li>${ room.price ? room.price : "" } per night</li>
                  <li>{ room.beds ? room.beds : "" } beds</li>
                  <li>{ room.num_guests ? room.num_guests : "" } { room.num_guests === 1 ? 'guest' : 'guests' } allowed</li>
                  <li>Property type: { room.prop_type ? room.prop_type : "" }</li>
                  <li>Room type: { room.room_type ? room.room_type : "" }</li>
                </ul>
              </div>
              <div className='trip-buttons'>
              <button
                  className='review-button-main2'
                  value={room.id}
                  onClick={this.editRoom}>
                    Edit this listing
              </button>
              <button
                  className='review-button-main2 review-button-main2-cancel'
                  value={room.id}
                  onClick={this.deleteRoom}>
                    Remove this listing
              </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const displayAllRooms = this.allRoomListed();
    const username = this.props.currentUser.username ? this.props.currentUser.username : "";
    return(
      <div>
        <Header/>
          <div className='trips-header'>
            <span id='trips-header-title'>Your Personal Listings</span>
            <span id='trips-header-desc'>View or delete your listings</span>
          </div>
          <div className='trips-container'>
            <div>
              <span className="trip-status">Current listings</span>
              {displayAllRooms}
            </div>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(UserListings);
