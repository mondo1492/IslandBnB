export const viewListingReviews = roomId => (
  $.ajax({
    method: 'GET',
    url: `api/reviews/${roomId}`
  })
);

export const addListingReview = review => (
  $.ajax({
    method: 'POST',
    url: 'api/reviews',
    data: review
  })
);
