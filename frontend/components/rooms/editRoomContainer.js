import { connect } from 'react-redux';
import EditRoom from './editRoom';
import { withRouter } from 'react-router';
import { receiveRoomsErrors, showRoom } from '../../actions/room_actions';
// import { addRoom } from '../../actions/room_actions';

const mapStateToProps = ({ session, rooms }, ownProps) => ({
  room: rooms.entities[ownProps.match.params.id] || {},
  currentUser: session.currentUser,
  errors: rooms.errors
});

const mapDispatchToProps = dispatch => ({
  showRoom: roomId => dispatch(showRoom(roomId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRoom));
