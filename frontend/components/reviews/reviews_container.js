import { connect } from 'react-redux';
import values from 'lodash/values';
import RoomReviews from './reviews';
import { viewReviews, addReview } from '../../actions/review_actions';
import { withRouter } from 'react-router';

const mapStateToProps = ({ session, reviews }, ownProps) => ({
  reviews: values(reviews.reviews) || [],
  currentUser: session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    viewReviews: roomId => dispatch(viewReviews(roomId)),
    addReview: review => dispatch(addReview(review))
  });

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomReviews));
