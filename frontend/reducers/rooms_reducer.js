import merge from 'lodash/merge';
import values from 'lodash/values';
import {
  RECEIVE_ROOM,
  REMOVE_ROOM,
  RECEIVE_ROOMS,
  RECEIVE_ROOMS_ERRORS
} from '../actions/room_actions';
import {
  RECEIVE_REVIEW,
  RECEIVE_REVIEWS
} from '../actions/review_actions';

const defaultState = Object.freeze({
  entities: [],
  errors: []
});

const roomReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState;
  switch(action.type) {
    case REMOVE_ROOM:
      nextState = Object.assign({}, state);
      delete nextState.entities[action.room.id];
      return nextState;
    case RECEIVE_ROOM:
      nextState = Object.assign({}, state);
      nextState.entities[action.room.id] = action.room;
      return nextState;
    case RECEIVE_ROOMS:
      nextState = Object.assign({}, state, { entities: action.rooms });
      return nextState;
    case RECEIVE_ROOMS_ERRORS:
      let errors = action.errors;
      nextState = Object.assign({}, state, { errors });
      return nextState;
    default:
      return state;
  }
};

export default roomReducer;
