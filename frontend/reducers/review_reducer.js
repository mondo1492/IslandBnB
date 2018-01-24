import merge from 'lodash/merge';
import {
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS
} from '../actions/review_actions';

const defaultState = Object.freeze({
  reviews: {}
});

const reviewReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState;
  switch(action.type) {
    case RECEIVE_REVIEWS:
      nextState = Object.assign({}, state, { reviews: action.reviews });
      return nextState;
    case RECEIVE_REVIEW:
      nextState = Object.assign({}, state);
      nextState.reviews[action.review.id] = action.review;
      return nextState;
    default:
      return state;
  }
};

export default reviewReducer;
