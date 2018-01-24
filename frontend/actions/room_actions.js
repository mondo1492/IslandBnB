export const RECEIVE_ROOM = 'RECEIVE_ROOM';
export const RECEIVE_ROOMS = 'RECEIVE_ROOMS';
export const REMOVE_ROOM = 'REMOVE_ROOM';
export const RECEIVE_ROOM_ERRORS = 'RECEIVE_ROOM_ERRORS';
import * as APIRoomUtil from '../util/room_api_util';


export const receiveRoom = room => ({
  type: RECEIVE_ROOM,
  room
});

export const receiveRooms = rooms => ({
  type: RECEIVE_ROOMS,
  rooms
});

export const removeRoom = room => ({
  type: REMOVE_ROOM,
  room
});

export const receiveRoomsErrors = errors => ({
  type: RECEIVE_ROOM_ERRORS,
  errors
});

export const addRoom = room => dispatch => {
  return APIRoomUtil.addRoom(room).then(
    response => dispatch(receiveRoom(response)),
    errors => dispatch(receiveRoomsErrors(errors.responseJSON))
  );
};

export const editRoom = room => dispatch => {
  return APIRoomUtil.editRoom(room).then(
    response => dispatch(receiveRoom(response)),
    errors => dispatch(receiveRoomsErrors(errors.responseJSON))
  );
};

export const showRoom = room => dispatch => {
  return APIRoomUtil.showRoom(room).then(
    response => dispatch(receiveRoom(response)),
    errors => dispatch(receiveRoomsErrors(errors.responseJSON))
  );
};


export const showAllRooms = (filters) => dispatch => {
  return APIRoomUtil.showAllRooms(filters).then(
    response => dispatch(receiveRooms(response)),
    errors => dispatch(receiveRoomsErrors(errors.responseJSON))
  );
};

//write a delete room action or remove room action
export const deleteRoom = room => dispatch => {
  return APIRoomUtil.deleteRoom(room).then(
    response => dispatch(removeRoom(response))
  );
};
