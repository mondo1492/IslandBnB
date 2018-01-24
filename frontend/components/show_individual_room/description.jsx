import React from 'react';
import { Link } from 'react-router-dom';

class Description extends React.Component{
  render() {
    const room = this.props.room;
    return(
      <div className="show-page-description">
        <h2>About this listing</h2>
        <h4>The space</h4>
        <p>{room.description ? room.description : "" }</p>
      </div>
    );
  }
}

export default Description;
