import { io, Socket } from 'socket.io-client';
import { API_URL } from '@/config';

const socket: Socket = io(API_URL, {
  autoConnect: false
});

export default socket;
