export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
import * as APIReviewUtil from '../util/review_api_util';


export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
});

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
});


export const viewReviews = roomId => dispatch => {
  return APIReviewUtil.viewListingReviews(roomId).then(
    response => dispatch(receiveReviews(response))
  );
};

export const addReview = review => dispatch => {
  return APIReviewUtil.addListingReview(review).then(
    response => dispatch(receiveReview(response))
  );
};
