import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserListings extends React.Component {
  constructor(props){
    super(props);
    this.state = { listing: [] };
  }

  componentWillMount() {
    this.props.getUserListings(this.props.currentUser.id);
    this.allRoomListed = this.allRoomListed.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.deleteRoom(e.currentTarget.value).then(
      () => this.setState(
        { listing: this.props.getUserListings(this.props.currentUser.id) }
    ));
  }

  allRoomListed() {
    return(
      <ul className="listing-index-container">
        {this.props.entities.reverse().map((room, i) =>(
          <li className="listing-index" key={room.id}>
            <div className="listing-index-item">
              <img src={ room.pic_url ? room.pic_url : "" }></img>
              <div>
                <h4>Title: { room.title ? room.title : "" }</h4>
                <h4>Price: ${ room.price ? room.price : "" } per day</h4>
                <button
                  className='delete-button'
                  value={room.id}
                  onClick={this.handleClick}>
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
        <h2 id="your-listings">Hi, {username}! Here are your current listings</h2>
        {displayAllRooms}
      </div>
    );
  }
}

export default withRouter(UserListings);
