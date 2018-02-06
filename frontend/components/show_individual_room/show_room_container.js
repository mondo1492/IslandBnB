import { connect } from 'react-redux';
import ShowRoom from './show_room';
import values from 'lodash/values';
import { showRoom } from '../../actions/room_actions';
import { withRouter } from 'react-router';


const mapStateToProps = ({ session, rooms, room }, ownProps) => {
  return ({
    room: rooms.entities[ownProps.match.params.id] || {},
    currentUser: session.currentUser,
    errors: rooms.errors
  });
};

const mapDispatchToProps = dispatch => ({
  showRoom: roomId => dispatch(showRoom(roomId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRoom));
