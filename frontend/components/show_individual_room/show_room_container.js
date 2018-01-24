import { connect } from 'react-redux';
import ShowRoom from './show_room';
import values from 'lodash/values';
import { showRoom } from '../../actions/room_actions';

const mapStateToProps = ({ session, rooms }, ownProps) => ({
  room: rooms.entities[ownProps.match.params.id] || {},
  currentUser: session.currentUser,
  errors: rooms.errors
});

const mapDispatchToProps = dispatch => ({
  showRoom: room => dispatch(showRoom(room))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRoom);
