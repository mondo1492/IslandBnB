export const RECEIVE_TRIP = 'RECEIVE_TRIP';
export const RECEIVE_TRIPS = 'RECEIVE_TRIPS';
export const RECEIVE_SPECIFIC_TRIPS = 'RECEIVE_SPECIFIC_TRIPS';
import * as APITripUtil from '../util/trip_api_util';


export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
});

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
});

export const receiveSpecificTrips = trips => ({
  type: RECEIVE_SPECIFIC_TRIPS,
  trips
});


export const getAllTripsSpecific = id => dispatch => {
  return APITripUtil.getAllTripsSpecific(id).then(
    response => dispatch(receiveSpecificTrips(response))
  );
};

export const viewTrips = () => dispatch => {
  return APITripUtil.showAllTrips().then(
    response => dispatch(receiveTrips(response))
  );
};

export const addTrip = trip => dispatch => {
  return APITripUtil.addTrip(trip).then(
    response => dispatch(receiveTrip(response))
  );
};
