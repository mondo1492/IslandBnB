import merge from 'lodash/merge';
import {
  RECEIVE_LISTING,
  REMOVE_ROOM
} from '../actions/listing_actions';

const defaultState = Object.freeze({
  entities: []
});

const listingReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState;
  switch(action.type) {
    case RECEIVE_LISTING:
      nextState = Object.assign({}, state, { entities: action.listing });
      return nextState;
    case REMOVE_ROOM:
      nextState = Object.assign({}, state);
      delete nextState.entities[action.room.id];
      return nextState;
    default:
      return state;
  }
};

export default listingReducer;
