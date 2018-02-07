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
  }

  componentWillMount() {
    this.props.viewTrips();
  }

  componentWillReceiveProps(nextProps) {
    this.categorizeTrips(nextProps.trips);
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
      } else if (this.formatMoment(trip.start_date).diff(today, 'day') >= 0){
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


  render() {
    const {currentTrips, futureTrips, pastTrips} = this.state;
    return(
      <div>
        <Header/>
        <div className='trips-container'>
          <div>
            <h2 id="your-trips">Current trips!</h2>
            <ul className="trip-index">
              {currentTrips.map((trip, i) => (
                <li key={`trip-${i}`}>
                  <div className="trip-item">
                    <img src={ trip.room_url ? trip.room_url : "" }></img>
                    <div>
                      <h2>Your Trip with { trip.host_name ? trip.host_name : "" }</h2>
                      <h4>Began on { trip.start_date ? this.formatDate(trip.start_date) : "" }</h4>
                      <h4>Ending on { trip.end_date ? this.formatDate(trip.end_date) : "" }</h4>
                      <h4>Costing ${ trip.total_cost ? trip.total_cost : "" }</h4>
                      <h4>At { trip.room_address ? trip.room_address : "" }</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="your-trips">Future trips!</h2>
            <ul className="trip-index">
              {futureTrips.map((trip, i) => (
                <li key={`trip-${i}`}>
                  <div className="trip-item">
                    <img src={ trip.room_url ? trip.room_url : "" }></img>
                    <div>
                      <h2>Your Trip with { trip.host_name ? trip.host_name : "" }</h2>
                      <h4>Beginning on { trip.start_date ? this.formatDate(trip.start_date) : "" }</h4>
                      <h4>Ending on { trip.end_date ? this.formatDate(trip.end_date) : "" }</h4>
                      <h4>Costing ${ trip.total_cost ? trip.total_cost : "" }</h4>
                      <h4>At { trip.room_address ? trip.room_address : "" }</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="your-trips">Past trips!</h2>
            <ul className="trip-index">
              {pastTrips.reverse().map((trip, i) => (
                <li key={`trip-${i}`}>
                  <div className="trip-item">
                    <img src={ trip.room_url ? trip.room_url : "" }></img>
                    <div>
                      <h2>Your Trip with { trip.host_name ? trip.host_name : "" }</h2>
                      <h4>Began on { trip.start_date ? this.formatDate(trip.start_date) : "" }</h4>
                      <h4>Ended on { trip.end_date ? this.formatDate(trip.end_date) : "" }</h4>
                      <h4>Cost ${ trip.total_cost ? trip.total_cost : "" }</h4>
                      <h4>At { trip.room_address ? trip.room_address : "" }</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <Footer onFrontPage={false}/>
      </div>

    );
  }
}

export default withRouter(Trips);
