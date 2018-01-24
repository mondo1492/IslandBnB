import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './nav_links';
import Title from './title';
import Features from './features';
import Description from './description';
import MoreDetails from './more_details';
import ReviewsContainer from '../reviews/reviews_container';
import TripsContainer from '../trips/trips_container';

class ShowRoom extends React.Component {
  componentWillMount() {
    this.props.showRoom(this.props.match.params.id);
  }

  bannerPicture() {
    const bannerPictureStyle = {
      height: "100%",
      width: "100%",
      backgroundImage: `url(${this.props.room.pic_url})`
    };
    return(
      <div className="show-page-picture"
        style={bannerPictureStyle}
      />
    );
  }

  showBooking() {
    return(
      <div>
        <h2>Book this room!</h2>
        <TripsContainer />
      </div>

    );
  }

  render(){
    const room = this.props.room;
    const showBooking = this.props.currentUser ? this.showBooking() : "";
    return(
      <div>
        {this.bannerPicture()}
        <div className="show-room-container">
          <div className="show-main-content">

            <Title room={room}  />
            <Features room={room} />
            <Description room={room} />
            <MoreDetails room={room} />
            <a href="reviews"></a>
            <ReviewsContainer />
            <a href="#host"></a>
          </div>
          <div className="floating-booking">
            { showBooking }
          </div>
        </div>
      </div>
    );
  }
}

export default ShowRoom;
// add back in when have time
// <NavLinks url={`#/rooms/${this.props.match.params.id}`}/>
// <div className="show-page-host">
//   <h3>Host info</h3>
// </div>
// <a name="location"></a>
// <div className="show-page-location">
//   <h3>Location</h3>
// </div>
