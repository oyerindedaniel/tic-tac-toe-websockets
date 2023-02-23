import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './routes/home';
import User from './routes/user';
import Game from './routes/game';
import WaitingRoom from './routes/waiting-room';
// import Layout from '@/components/Layout';
import NotFound from './routes/not-found';

const App = () => {
  return (
    <Routes>
      {/* <Layout> */}
      <Route path="/" element={<Navigate replace to="game/home" />} />
      <Route path="game/home" element={<Home />} />
      <Route path="game/user" element={<User />} />
      <Route path="game/waiting-room" element={<WaitingRoom />} />
      <Route path="game/:userId" element={<Game />} />
      <Route path="*" element={<NotFound />} />
      {/* </Layout> */}
    </Routes>
  );
};

export default App;
