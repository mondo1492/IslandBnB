import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import RoomsReducer from './rooms_reducer';
import ListingReducer from './listing_reducer';
import ReviewsReducer from './review_reducer';
import TripsReducer from './trips_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  rooms: RoomsReducer,
  listing: ListingReducer,
  reviews: ReviewsReducer,
  trips: TripsReducer
});

export default rootReducer;
