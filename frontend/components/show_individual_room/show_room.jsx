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
import Footer from '../front_page/front_footer.jsx';

class ShowRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alternate: false,
      positionFromTop: 0
    }
  }

  componentDidMount() {
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
        <TripsContainer isLoggedIn={this.props.currentUser}/>
      </div>
    );
  }

  showSignIn() {
    return(
      <div className='booking-item'>
        Sign up or log in to book.
      </div>
    );
  }

  componentWillUnmount() {
    $(window).off("scroll", this.registerWindowListeners());
    $(window).off("resize", this.registerWindowListeners());
  }

  render(){
    const room = this.props.room;
    // const showBooking = this.props.currentUser ? this.showBooking() : "";

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
              { this.showBooking() }
            </div>
            { alternate === true ?
              <div id="floating-booking-placeholder">
              </div> : ""
            }
          </div>
        </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default ShowRoom;
