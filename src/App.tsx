import { Route, Routes, Navigate } from 'react-router-dom';
import User from './routes/user';
import Game from './routes/game';
import NotFound from './routes/not-found';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/user" />} />
      <Route path="user" element={<User />} />
      <Route path="game/:userId" element={<Game />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
