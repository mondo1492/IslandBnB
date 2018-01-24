import { connect } from 'react-redux';
import values from 'lodash/values';
import UserListings from './user_listing';
import { viewListings } from '../../actions/listing_actions';
import { deleteRoom } from '../../actions/room_actions';
import { withRouter } from 'react-router';

const mapStateToProps = ({ session, listing}) => {
  return {
    entities: values(listing.entities),
    currentUser: session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserListings: currentUserId => dispatch(viewListings(currentUserId)),
    deleteRoom: room => dispatch(deleteRoom(room))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListings));
