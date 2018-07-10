import io from 'socket.io-client'; // eslint-disable-line
import store, { setOnlineUsers } from './store';

const socket = io(window.location.origin); // eslint-disable-line

socket.on('connect', () => {
  // console.log('Connected!');
});

socket.on('message', (data) => {
  console.log('socket message -->', data.message);
});

socket.on('data', (data) => {
  if (data.userCount) store.dispatch(setOnlineUsers(data.userCount));
});

export default socket;
