import merge from 'lodash/merge';
import {
  RECEIVE_TRIPS,
  RECEIVE_TRIP,
  RECEIVE_SPECIFIC_TRIPS
} from '../actions/trip_actions';

const defaultState = Object.freeze({
  trips: {},
  specific_trips: {}
});

const tripReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState;
  switch(action.type) {
    case RECEIVE_SPECIFIC_TRIPS:
      nextState = Object.assign({}, state, { specific_trips: action.trips });
      return nextState;
    case RECEIVE_TRIPS:
      nextState = Object.assign({}, state, { trips: action.trips });
      return nextState;
    case RECEIVE_TRIP:
      nextState = Object.assign({}, state);
      nextState.trips[action.trip.id] = action.trip;
      return nextState;
    default:
      return state;
  }
};

export default tripReducer;
