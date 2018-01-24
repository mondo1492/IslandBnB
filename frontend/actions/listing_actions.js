export const RECEIVE_LISTING = 'RECEIVE_LISTING';
import * as APIListingUtil from '../util/listing_api_util';


export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing
});

export const viewListings = currentUserId => dispatch => {
  return APIListingUtil.viewListings(currentUserId).then(
    response => dispatch(receiveListing(response))
  );
};
