import { connect } from 'react-redux';
import values from 'lodash/values';
import Trips from './trips';
import { addTrip, viewTrips, getAllTripsSpecific } from '../../actions/trip_actions';
import { withRouter } from 'react-router';

const mapStateToProps = ({ session, trips }, ownProps) => {
  return({
  trips: values(trips.trips) || [],
  currentUser: session.currentUser
});};

const mapDispatchToProps = (dispatch) => {
  return {
    viewTrips: () => dispatch(viewTrips())
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips));
