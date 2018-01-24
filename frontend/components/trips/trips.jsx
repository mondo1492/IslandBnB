import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import strftime from 'strftime';

class Trips extends React.Component {
  componentWillMount() {
    this.props.viewTrips();
  }

  formatDate(date) {
    return strftime('%B %d, %Y', new Date(date));
  }

  render() {
    const trips = this.props.trips ? this.props.trips : [];
    return(
      <div>
        <h2 id="your-trips">Your trips!</h2>
        <ul className="trip-index">
          {trips.reverse().map((trip, i) => (
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

    );
  }
}

export default withRouter(Trips);
