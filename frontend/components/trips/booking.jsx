import React from 'react';
import merge from 'lodash/merge';
import { DateRangePicker } from "react-dates";
import { ReactiveBase, NumberBox, RangeSlider } from '@appbaseio/reactivesearch';
import moment from 'moment';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      blockoutDates: [],
      booking: {
        num_guests: 1,
        total_cost: 0
      },
      pricePerNight: this.props.room.price,
      dayCount: 0,
      dayCountSumCost: 0,
      cleaningFee: 0,
      serviceFee: 0,
      totalCost: 0,
      maxGuests: this.props.room.num_guests ? this.props.room.num_guests : 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.blockOutDates = this.blockOutDates.bind(this);
    this.toggleBlockedDates = this.toggleBlockedDates.bind(this);
    this.getBlockedDates = this.getBlockedDates.bind(this);
    this.blockBeforeAndAfter = this.blockBeforeAndAfter.bind(this);
    this.calculatePerDayPrice = this.calculatePerDayPrice.bind(this);
  }

  componentDidMount() {
    this.props.getAllTripsSpecific(this.props.match.params.id).then(()=> {
      this.blockOutDates();
    });
  }

  handleSubmit() {
    const { startDate, endDate, totalCost } = this.state;
    if (startDate && endDate) {
      const booking = merge(
        {}, { booking: this.state.booking },
        { booking:
          {
            room_id: this.props.match.params.id,
            guest_id: this.props.currentUser.id,
            total_cost: totalCost,
            start_date: startDate['_d'],
            end_date: endDate['_d']
          }
        });
      this.props.addTrip(booking).then( ()=> {this.props.history.push('/trips');} );
    } else {
      this.setState({ focusedInput: 'startDate'});
    }
  }

  updateCosts() {
    const { startDate, endDate } = this.state;
    let dayCount = (startDate && endDate) ? endDate.diff(startDate, 'days') : 1;
    let dayCountSumCost = dayCount * this.calculatePerDayPrice();
    let cleaningFee = Math.round(dayCountSumCost * .05);
    let serviceFee = Math.round(dayCountSumCost * .02);
    let totalCost = dayCountSumCost + cleaningFee + serviceFee;
    this.setState({
      dayCount: dayCount,
      dayCountSumCost: dayCountSumCost,
      cleaningFee: cleaningFee,
      serviceFee: serviceFee,
      totalCost: totalCost
     });
  }

  updateGuestAndCost(min_guests) {
      this.setState({
        booking: Object.assign(this.state.booking, { num_guests: min_guests })
     }, ()=> { this.updateCosts() });
  }

  blockOutDates() {
    let allBlockedOutDays = [];
    let subDays = [];
    this.props.trips.forEach( trip => {
      let currentDate = new Date(trip.start_date);
      while (currentDate <= new Date(trip.end_date)) {
        subDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    subDays.forEach( (day) => {
      allBlockedOutDays.push(moment(day));
    });
    this.setState({ blockoutDates: allBlockedOutDays });
    return allBlockedOutDays;
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
    if (focusedInput === 'startDate') {
      this.setState({ startDate: null, endDate: null });
    }
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, ()=> {this.updateCosts()});
  }

  isSameDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    return (
      a.date() === b.date() &&
      a.month() === b.month() &&
      a.year() === b.year());
  }

  getFirstUnblocked() {
    const { blockoutDates, startDate } = this.state;
    for (let i = 0; i < blockoutDates.length; i++) {
      if (startDate.diff(blockoutDates[i], 'day') < 0) {
        return blockoutDates[i];
      }
    }
    return null;
  }

  blockBeforeAndAfter(day, firstBlocked) {
    if (this.state.startDate.diff(day, 'day') > 0) {
      return true;
    } else if (firstBlocked) {
      return (firstBlocked.diff(day, 'day') <= 0);
    } else {
      return false;
    }
  }

  getBlockedDates(day1) {
    return this.state.blockoutDates.some(day2 => this.isSameDay(day1, day2));
  }

  toggleBlockedDates(day) {
    if (this.state.startDate === null) {
      return this.getBlockedDates(day);
    } else {
      return this.blockBeforeAndAfter(day, this.getFirstUnblocked())
    }
  }

  calculatePerDayPrice() {
    return (this.props.room.price + (15 * (this.state.booking.num_guests - 1)));
  }

  showButton() {
    return (
      <div className="booking-button-container">
        <button value={this.state.totalCost} onClick={()=>this.handleSubmit()}>Request to Book</button>
      </div>
    );
  }

  priceBreakdown() {
    const { dayCount, dayCountSumCost, cleaningFee, serviceFee, totalCost } = this.state;
    return (
      <div className='booking-item-4'>
        <div>
          <span>${this.calculatePerDayPrice()} x {dayCount} {dayCount === 1 ? 'night' : 'nights'}</span>
          <span>${dayCountSumCost}</span>
        </div>
        <div>
          <span>Cleaning fee (5%)</span>
          <span>${cleaningFee}</span>
        </div>
        <div>
          <span>Service fee (2%)</span>
          <span>${serviceFee}</span>
        </div>
        <div id='booking-item-4-total-cost'>
          <span>Total</span>
          <span>${totalCost}</span>
        </div>
      </div>
    );
  }

  getDatesAndGuestCount(displayCost) {
    const { focusedInput, startDate, endDate, blockedDates } = this.state;
    const { num_guests } = this.state.booking;
    const displayBreakdown = (this.state.endDate && this.state.startDate) ? this.priceBreakdown() : "";
    return (
      <div className="guest-booking">
        <div>
          <div id='booking-item-1'>
            <div id='booking-item-1-price'>${this.calculatePerDayPrice()}</div>
            <div>&nbsp;per night</div>
          </div>
          <div id='booking-item-2'>
            <div id='booking-item-tag'>Dates</div>
            <div className='date-range-picker-wrapper'>
              <DateRangePicker
                numberOfMonths={1}
                isDayBlocked={ day => this.toggleBlockedDates(day) }
                onDatesChange={ this.onDatesChange }
                onFocusChange={ this.onFocusChange }
                focusedInput={ focusedInput }
                startDate={ startDate }
                endDate={ endDate }
              />
            </div>
          </div>
          <div id='booking-item-3'>
            <div id='booking-item-tag'>Guests</div>
              <ReactiveBase app='bnb' credentials='none'>
                <div className='booking-content'>
                  <NumberBox
                    componentId="NumberBoxSensor"
                    dataField="guests"
                    data={{
                      label: `${num_guests} ${num_guests === 1 ? 'Guest' : 'Guests'}`,
                      start: 1,
                      end: this.state.maxGuests }}
                    defaultSelected={num_guests}
                    onValueChange={(data)=>{this.updateGuestAndCost(data);}}
                  />
                </div>
              </ReactiveBase>
          </div>
          {displayBreakdown}
        </div>
        {this.showButton()}
      </div>
    );
  }

  render() {
    return(
      <div className="booking">
        {this.getDatesAndGuestCount()}
      </div>
    );
  }
}

export default Booking;
