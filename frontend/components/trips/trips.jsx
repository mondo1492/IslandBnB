import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import strftime from 'strftime';
import Header from '../header.jsx';
import Footer from '../front_page/front_footer.jsx';
import moment from 'moment';

class Trips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrips: [],
      futureTrips: [],
      pastTrips: []
    }
    this.categorizeTrips = this.categorizeTrips.bind(this);
    this.deleteTrip = this.deleteTrip.bind(this);
    this.showListing = this.showListing.bind(this);
    this.tripItem = this.tripItem.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.renderTrips = this.renderTrips.bind(this);
  }

  componentWillMount() {
    this.props.viewTrips();
  }

  componentWillReceiveProps(nextProps) {
    this.categorizeTrips(nextProps.trips);
  }

  deleteTrip(e) {
    e.preventDefault();
    this.props.deleteTrip(e.currentTarget.value);
  }


  formatDate(date) {
    return strftime('%B %d, %Y', new Date(date));
  }

  formatMoment(date) {
    return moment(strftime('%F %T', new Date(date)), "YYYY-MM-DD");
  }

  sortTrips(trips) {
    return trips.sort( (a, b) => {
      return this.formatMoment(a.start_date).diff(this.formatMoment(b.start_date));
    });
  }

  categorizeTrips(trips) {
    const currentTrips = [];
    const futureTrips = [];
    const pastTrips = [];
    const today = new Date();
    trips.forEach(trip => {
      if (this.formatMoment(trip.end_date).diff(today, 'day') <= 0) {
        pastTrips.push(trip);
      } else if (this.formatMoment(trip.start_date).diff(today, 'day') > 0){
        futureTrips.push(trip);
      } else {
        currentTrips.push(trip);
      }
    });
    this.setState({
      currentTrips: this.sortTrips(currentTrips),
      futureTrips: this.sortTrips(futureTrips),
      pastTrips: this.sortTrips(pastTrips)
    });
  }

  showListing(e) {
    e.preventDefault();
    this.props.history.push(`/rooms/${e.currentTarget.value}`);
  }

  tripItem(tripStatus, trip, i) {
    const begin = { 'C': 'Began', 'F': 'Begins', 'P': 'Began'};
    const end = { 'C': 'Ends', 'F': 'Ends', 'P': 'Ended'};
    return(
      <li key={`trip-${i}`}>
        <div className="trip-item">
          <img src={ trip.room_url ? trip.room_url : "" }></img>
          <div className='trip-item-details'>
            <span>Your Trip with { trip.host_name ? trip.host_name : "" }</span>
            <ul>
              <li>{begin[tripStatus]} on { trip.start_date ? this.formatDate(trip.start_date) : "" }</li>
              <li>{end[tripStatus]} on { trip.end_date ? this.formatDate(trip.end_date) : "" }</li>
              <li>Costing ${ trip.total_cost ? trip.total_cost : "" }</li>
              <li>At { trip.room_address ? trip.room_address : "" }</li>
            </ul>
          </div>
          <div className='trip-buttons'>
            <button className='review-button-main2' value={trip.room_id} onClick={this.showListing}>
              View listing or Book again
            </button>
            { tripStatus === 'F' ?
              <button
                className='review-button-main2 review-button-main2-cancel'
                value={trip.id}
                onClick={this.deleteTrip}>
                  Cancel this trip
              </button> : ""
            }
          </div>
        </div>
      </li>
    );
  }

  renderTrips(title, trips, tripStatus) {
    if (trips.length > 0) {
      return (
          <div>
            <span className="trip-status">{title}</span>
            <ul className="trip-index">
              {trips.map((trip, i) => (
                this.tripItem(tripStatus, trip, i)
              ))}
            </ul>
          </div>
      );
    } else {
      return "";
    }
  }

  renderNoTrips() {
    return (
      <div>
        <Link to='/islands' className="trip-status no-status">No trips booked, click to search for a trip</Link>
      </div>
    );
  }

  render() {
    const {currentTrips, futureTrips, pastTrips} = this.state;
    const allEmpty = currentTrips.length === 0 && futureTrips.length === 0 && pastTrips.length === 0;
    return(
      <div>
        <Header/>
        <div className='trips-header'>
          <span id='trips-header-title'>Your Trips</span>
          <span id='trips-header-desc'>View current, future, and past trips</span>
        </div>
        <div className='trips-container'>
          {this.renderTrips("Current Trips", currentTrips, 'C')}
          {this.renderTrips("Future trips", futureTrips, 'F')}
          {this.renderTrips("Past trips", pastTrips, 'P')}
          {allEmpty ? this.renderNoTrips() : ""}
        </div>
        <Footer onFrontPage={false}/>
      </div>

    );
  }
}

export default withRouter(Trips);
