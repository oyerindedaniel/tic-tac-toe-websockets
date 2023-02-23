import { Route, Routes } from 'react-router-dom';
import Home from './routes/home';
import User from './routes/user';
import Game from './routes/game';
import Layout from '@/components/Layout';
import NotFound from './routes/not-found';

const App = () => {
  return (
    <Routes>
      {/* <Layout> */}
      <Route path="/" element={<Home />} />
      <Route path="user" element={<User />} />
      <Route path="game/:userId" element={<Game />} />
      <Route path="*" element={<NotFound />} />
      {/* </Layout> */}
    </Routes>
  );
};

export default App;
