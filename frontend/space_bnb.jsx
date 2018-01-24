import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import Modal from 'react-modal';

///TESTING
import { showAllRooms } from './actions/room_actions';
// import { showAllRooms } from './util/room_api_util';
import { logout } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser, errors: [] } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.showAllRooms = showAllRooms;
  window.logout = logout;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.showAllRooms2 = store.showAllRooms2;
  const root = document.getElementById('root');
  Modal.setAppElement(document.HashRouter);
  ReactDOM.render(<Root store={ store }/>, root);
});
