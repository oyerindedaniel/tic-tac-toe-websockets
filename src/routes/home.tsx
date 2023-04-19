import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeaderMainTicTacToeImg, XTicTacToeImg, OTicTacToeImg } from '@/assets/constants';

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden bg-blue">
      <div className="absolute top-1/2 left-1/2 h-full max-h-[35rem] w-full max-w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lightBlue blur-3xl">
        &nbsp;
      </div>
      <div className="absolute left-1/2 top-1/2 z-50 inline w-[60%] -translate-x-1/2 -translate-y-1/2 sm:w-[55%] md:w-[45%]">
        <img className="h-full w-full" src={HeaderMainTicTacToeImg} alt="Tic-Tac-Toe" />
        <div className="absolute left-1/2 bottom-[0] -translate-y-[-115%] -translate-x-1/2">
          <button
            type="button"
            onClick={() => navigate('/game/user')}
            className="button button--lg flex items-center gap-1"
          >
            <img className="h-6 w-6 md:h-8 md:w-8" src={XTicTacToeImg} alt="X" />
            <span className="text-xl font-black md:text-2xl">Start</span>
            <img className="h-6 w-6 md:h-8 md:w-8" src={OTicTacToeImg} alt="O" />
          </button>
        </div>
      </div>

      <motion.div className="absolute left-[8%] top-[15%] w-[18%] -rotate-[30deg] sm:w-[15%] md:w-[10%]">
        <img className="h-full w-full" src={XTicTacToeImg} alt="X" />
      </motion.div>

      <motion.div className="absolute right-[10%] top-[17%] w-[18%] sm:w-[15%] md:w-[10%]">
        <img className="h-full w-full" src={OTicTacToeImg} alt="O" />
      </motion.div>
      <motion.div className="absolute left-[8%] top-[60%] w-[21%] rotate-[30deg] sm:w-[21%] md:w-[16%]">
        <img className="h-full w-full" src={OTicTacToeImg} alt="O" />
      </motion.div>
      <motion.div className="absolute right-[5%] top-[70%] w-[25%] rotate-[30deg] sm:w-[25%] md:w-[20%]">
        <img className="h-full w-full" src={XTicTacToeImg} alt="X" />
      </motion.div>
    </section>
  );
};

export default Home;
