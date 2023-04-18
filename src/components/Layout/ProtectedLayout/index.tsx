/* eslint-disable no-console */
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGlobalStoreContext } from '@/context';
import socket from '@/utils/socketio';

const ProtectedLayout: FC = () => {
  const navigate = useNavigate();
  const {
    state: {
      user: { userName }
    }
  } = useGlobalStoreContext();

  useEffect(() => {
    if (!userName) {
      toast.error('Enter your preferred Username 😒');
      navigate('/game/user');
    }

    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to socket.io server!');
    });

    return () => {
      console.log('Disconnecting from socket.io server...');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default ProtectedLayout;
