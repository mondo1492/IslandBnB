export const addRoom = room => (
  $.ajax({
    method: 'POST',
    url: 'api/rooms',
    data: room
  })
);

export const showAllRooms = filters => (
  $.ajax({
    method: 'GET',
    url: 'api/rooms',
    data: {bounds: filters}
  })
);

export const deleteRoom = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/rooms/${id}`
  })
);

export const editRoom = room => (
  $.ajax({
    method: 'PATCH',
    url: `api/rooms/${room.id}`
  })
);

export const showRoom = id => (
  $.ajax({
    method: 'GET',
    url: `api/rooms/${id}`
  })
);
