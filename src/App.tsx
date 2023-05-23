import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import Home from './routes/home';
import User from './routes/user';
import Game from './routes/game';
import WaitingRoom from './routes/waiting-room';
import NotFound from './routes/not-found';
import Layout from '@/components/Layout';
import ProtectedLayout from '@/components/Layout/ProtectedLayout';
import socket from './utils/socketio';
import { useGlobalStoreContext } from './context';

const App = () => {
  const { dispatch } = useGlobalStoreContext();

  const setIsSocketIOConnected = useCallback(
    (payload: boolean) => dispatch({ type: 'SET_SOCKET-IO', payload }),
    [dispatch]
  );

  useEffect(() => {
    const onConnect = () => {
      setIsSocketIOConnected(true);
    };

    const onDisconnect = () => {
      setIsSocketIOConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [setIsSocketIOConnected]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="game/home" />} />
        <Route path="/game/home" element={<Home />} />
        <Route path="/game/user" element={<User />} />
        <Route path="game" element={<ProtectedLayout />}>
          <Route path="waiting-room" element={<WaitingRoom />} />
          <Route path=":socketId" element={<Game />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
