import { connect } from 'react-redux';
import values from 'lodash/values';
import Trips from './trips';
import { viewTrips, deleteTrip } from '../../actions/trip_actions';
import { withRouter } from 'react-router';

const mapStateToProps = ({ session, trips }, ownProps) => {
  return({
  trips: values(trips.trips) || [],
  currentUser: session.currentUser
});};

const mapDispatchToProps = (dispatch) => {
  return {
    viewTrips: () => dispatch(viewTrips()),
    deleteTrip: tripId => dispatch(deleteTrip(tripId))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips));
