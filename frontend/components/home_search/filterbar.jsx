import React from 'react';
import Header from '../header.jsx';

import MainDisplayContainer from '../main_display/main_display_container';
import GoogleMap from './map';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bed_params: { min: 0, max: 50},
      price_params: { min: 0, max: 1000000},
      guest_params: { min: 0, max: 50},
      home_type: {
        entire_place: false,
        private_room: false,
        shared_room: false
      }
    };
  }

  render() {
    return(
      <div>
        {this.searchParameters()}
        <div className="rooms-map-main-container">

          <MainDisplayContainer />
          <GoogleMap rooms={this.props.entities}
            updateRooms={this.updateRooms.bind(this)}
            bedParams={this.state.bed_params}/>
        </div>

      </div>

    );
  }
}

export default Search;
