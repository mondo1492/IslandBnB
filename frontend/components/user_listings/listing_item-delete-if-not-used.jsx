import React from 'react';
import { Link } from 'react-router-dom';

class ListingItem extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.deleteRoom(this.props.room);
  }

  render() {
    return(
    <li className="listing-index-item">
      <h4>{this.props.room.title}</h4>
      <button
        className='delete-button'
        onClick={this.handleClick}>
        Remove!
      </button>
    </li>
    );
  }
}

export default ListingItem;
