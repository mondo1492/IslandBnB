import { connect } from 'react-redux';
import Greeting from './greeting';
import { receiveErrors } from '../../actions/session_actions';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
  errors: session.errors
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  resetErrors: () => dispatch(receiveErrors([]))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
