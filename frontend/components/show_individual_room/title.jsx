import React from 'react';

class Title extends React.Component{
  render() {
    const room = this.props.room;
    return(
      <div className="show-page-title">
        <div className="show-page-title-left">
          <h2>{ room.title ? room.title : "" }</h2>
          <h4>{ room.address ? room.address : "" }</h4>
          <h4>With your host, {room.host_name ? room.host_name : "" }</h4>
        </div>
        <div className="show-page-title-right">
          <img src=""></img>
        </div>
      </div>
    );
  }
}

export default Title;
