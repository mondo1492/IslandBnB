import React from 'react';
import merge from 'lodash/merge';
import { DateRangePicker } from "react-dates";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockout_dates: [],
      booking: {
        num_guests: "",
        total_cost: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCost = this.updateCost.bind(this);
  }

  componentDidMount() {
    this.props.getAllTripsSpecific(this.props.match.params.id).then(()=> {
      this.blockOutDates();
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    const booking = merge(
      {}, { booking: this.state.booking },
      { booking:
        {
          room_id: this.props.match.params.id,
          guest_id: this.props.currentUser.id,
          start_date: this.state.startDate['_d'],
          end_date: this.state.endDate['_d'],
        }
      }
    );
    this.props.addTrip(booking).then( ()=> {this.props.history.push('/trips');} );
  }

  update(field) {
    return e => {
      this.setState({
        booking: Object.assign(this.state.booking, { [field]: e.currentTarget.value})
     });
   };
  }

  updateCost(cost) {
    return e => {
      this.setState({
        booking: Object.assign(this.state.booking, { total_cost: cost})
     });
   };
  }

  showButton(displayCost) {
    return(
      <div className="calculate-button-container">
        <button className="calculate-button" value={displayCost} onClick={this.update('total_cost')}>Confirm number of guests and dates</button>
      </div>

    );

  }

  blockOutDates() {
    let allBlockedOutDays = [];
    let subDays = [];
    this.props.trips.forEach( (trip) => {
      let currentDate = new Date(trip.start_date);
      while (currentDate <= new Date(trip.end_date)) {
        subDays.push((new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    subDays.forEach( (day) => {
      allBlockedOutDays.push(String(day));
    });
    this.setState({blockout_dates: allBlockedOutDays});
    return allBlockedOutDays;
  }

  selectedOutDates(start, end) {
    let allBlockedOutDays2 = [];
    let subDays2 = [];
    let currentDate2 = new Date(start);
    while (currentDate2 <= new Date(end)) {
      subDays2.push((new Date(currentDate2)));
      currentDate2.setDate(currentDate2.getDate() + 1);
    }
    subDays2.forEach( (day) => {
      allBlockedOutDays2.push(String(day));
    });
    return allBlockedOutDays2;
  }

  overlap() {
    let arr = this.selectedOutDates(this.state.startDate['_d'], this.state.endDate['_d']);
    let isInDate = false;
    arr.forEach((day) => {
      if (this.state.blockout_dates.includes(""+day+"")) {
        isInDate = true;
      }
    });
    return isInDate;
  }


  clientSideCheck() {
    if (this.state.endDate && this.state.startDate) {
      let bool = this.overlap();
      return bool;
    }
    return true;
  }

  showBookingError() {
    return (
      <div>
        <h4>Sorry, the days you have selected have already been booked</h4>
        <h4>Please select other dates</h4>
      </div>
    );
  }

  calculate(displayCost) {
    const bool2 = this.state.booking.num_guests && this.state.endDate && this.state.startDate;
    const showError = this.clientSideCheck() ?   this.showBookingError() : "";
    const showErrorDisplay = (this.state.endDate && this.state.startDate) ? showError : "";
    const show = (bool2 && !this.clientSideCheck()) ? this.showButton(displayCost) : "";
    const blockedDates = this.state.blockout_dates;
    return(
      <div className="guest-booking">
        <div>
          <h2>Guests</h2>
          <input
            type="number"
            value={this.state.booking.num_guests}
            onChange={this.update('num_guests')}
            placeholder="Number of Guests"
            min={1}
          />
        </div>
        <div>
          <h2>Dates</h2>
          <DateRangePicker
                startDate={ this.state.startDate }
                endDate={ this.state.endDate }
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate, blockout_dates: blockedDates })}
                focusedInput={ this.state.focusedInput }
                onFocusChange={ focusedInput => this.setState({ focusedInput }) }
                isDayBlocked={ (day) => blockedDates.includes(""+ day['_d']+"")}
            />
        </div>
        {show}
        {showErrorDisplay}
      </div>

    );
  }

  book(displayCost) {
    return(
      <div className="book-room-show-price">
        <div>
          <h2>Your total cost is </h2>
          <h2 className="booking-price">${displayCost}</h2>
        </div>
        <button className="calculate-button" onClick={this.handleSubmit}>Book This Room!</button>
      </div>

    );
  }

 //
 //  addDays(days) {
 //    let dat = new Date(this.valueOf("2010-01-14"));
 //    dat.setDate(dat.getDate() + days);
 //    return dat;
 //  }
 //
 //  getDates(startDate, stopDate) {
 //    var dateArray = new Array();
 //    var currentDate = new Date(currentDate);
 //    while (currentDate <= stopDate) {
 //      dateArray.push(currentDate);
 //      currentDate = currentDate.addDays(1);
 //    }
 //   return dateArray;
 // }
 //




  render() {
    let displayCost = 0;
    if (this.state.startDate && this.state.endDate) {
      displayCost = this.state.endDate.diff(this.state.startDate, 'days');
      displayCost *= this.props.room.price;
    }
    const display = this.state.booking.total_cost ? this.book(displayCost) : this.calculate(displayCost);
    return(
      <div className="booking">
        {display}
      </div>
    );
  }
}
// "Wed Aug 30 2017 00:00:00 GMT-0700 (PDT)"].includes(day.d)
export default Booking;
