export const addTrip = trip => (
  $.ajax({
    method: 'POST',
    url: 'api/trips',
    data: trip
  })
);

export const showAllTrips = () => (
  $.ajax({
    method: 'GET',
    url: 'api/trips',
  })
);

export const getAllTripsSpecific = id => (
  $.ajax({
    method: 'GET',
    url: `api/trips/specific/${id}`,
  })
);


export const showTrip = id => (
  $.ajax({
    method: 'GET',
    url: `api/trips/${id}`
  })
);
