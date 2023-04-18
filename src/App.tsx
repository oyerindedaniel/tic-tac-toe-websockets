import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './routes/home';
import User from './routes/user';
import Game from './routes/game';
import WaitingRoom from './routes/waiting-room';
import NotFound from './routes/not-found';
import Layout from '@/components/Layout';
import ProtectedLayout from '@/components/Layout/ProtectedLayout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="game/home" />} />
        <Route path="/game/home" element={<Home />} />
        <Route path="/game/user" element={<User />} />
        <Route path="game" element={<ProtectedLayout />}>
          <Route path="waiting-room" element={<WaitingRoom />} />
          <Route path=":userId" element={<Game />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
