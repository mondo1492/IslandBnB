import { connect } from 'react-redux';
import Search from './search';
import values from 'lodash/values';
import { showAllRooms } from '../../actions/room_actions';

const mapStateToProps = ({ session, rooms }) => ({
  entities: values(rooms.entities),
  currentUser: session.currentUser,
  errors: rooms.errors
});

const mapDispatchToProps = dispatch => ({
  getAllRooms: (filters) => dispatch(showAllRooms(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
