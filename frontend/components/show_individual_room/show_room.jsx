import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './nav_links';
import Title from './title';
import Features from './features';
import Description from './description';
import MoreDetails from './more_details';
import ReviewsContainer from '../reviews/reviews_container';
import TripsContainer from '../trips/trips_container';
import Header from '../header.jsx';

class ShowRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alternate: false,
      positionFromTop: 0
    }
  }

  componentDidMount() {
    // $(window).off("scroll", this.registerWindowListeners());
    // $(window).off("resize", this.registerWindowListeners());
    this.registerWindowListeners();
  }

  registerWindowListeners() {
    $(window).resize(() => {
      let s = $("#floating-booking");
      let y = $("#floating-booking-placeholder");
      let pos = s.position();
      let pos2 = y.position();
      this.setState({positionFromTop: pos2 ? pos2.top : pos.top });
    });

    $(document).ready( () => {
      let s = $(".sticker");
      let pos = s.position();
      this.setState({positionFromTop: pos.top }, ()=> {
        $(window).scroll(() => {
            let windowpos = $(window).scrollTop();
            if ((windowpos + 80) >= this.state.positionFromTop) {
                s.addClass("stick");
                this.setState({alternate: true});
            } else {
                s.removeClass("stick");
                this.setState({alternate: false});
            }
        });
      });
    });
  }

  componentWillMount() {
    this.props.showRoom(this.props.match.params.id);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.showRoom(this.props.match.params.id);
    }
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
      <div className='booking-item'>
        <TripsContainer />
      </div>
    );
  }

  componentWillUnmount() {
    $(window).off("scroll", this.registerWindowListeners());
    $(window).off("resize", this.registerWindowListeners());
  }

  render(){
    // console.log();
    const room = this.props.room;
    const showBooking = this.props.currentUser ? this.showBooking() : "";



//
// <div id="wrapper">
//   <div id="mainContent">
//     <!--Content for your main div - like a blog post-->
//   </div>
//   <div id="sideBar">
//     <!--Some content in your right column/sidebar-->
//     <div id="sticker">...start scrolling to watch me stick</div>
//   </div>
//   <div class="clear"></div>
// </div>
    let alternate = this.state.alternate;
    return(
      <div>
        <Header/>
      <div>
        {this.bannerPicture()}
        <div className="show-room-container">
          <div className="show-main-content">
            <div className='room-details'>
              <Title room={room}  />
              <Features room={room} />
              <Description room={room} />
              <MoreDetails room={room} />
              <a href="reviews"></a>
              <ReviewsContainer />
              <a href="#host"></a>
            </div>
            <div id="floating-booking" className='sticker'>
              { showBooking }
            </div>
            { alternate === true ?
              <div id="floating-booking-placeholder">
              </div> : ""
            }
          </div>
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
