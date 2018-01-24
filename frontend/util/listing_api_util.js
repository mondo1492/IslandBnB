export const viewListings = currentUserId => (
  $.ajax({
    method: 'GET',
    url: `api/listings/${currentUserId}`
  })
);
