import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitArrow } from '@/assets/constants';
import { useGlobalStoreContext } from '@/context';
import { generateID } from '@/utils';

const User = () => {
  const { state, dispatch } = useGlobalStoreContext();
  const [userName, setUserName] = useState(state.user.userName);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'SET_USER',
      payload: { userName: userNameRef?.current?.value || '' }
    });
    navigate('/game/waiting-room');
  };

  const changeUserAvatar = () => {
    dispatch({
      type: 'SET_USER',
      payload: { userPhotoId: generateID(10) }
    });
  };

  return (
    <section className="relative flex h-[100vh] w-full items-center justify-center bg-blue px-4">
      <div className="absolute top-1/2 left-1/2 h-full max-h-[35rem] w-full max-w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lightBlue blur-3xl">
        &nbsp;
      </div>
      <div className="z-10 w-full max-w-[30rem] rounded-lg bg-white p-4 sm:p-8">
        <div>
          <img
            className="m-auto h-24 w-24 md:h-28 md:w-28"
            src={`https://avatars.dicebear.com/api/big-smile/${state.user.userPhotoId}.svg?skinColor=variant07,variant08`}
            alt={`player ${state.user.userName}'s avatar`}
          />
          <button
            onClick={() => changeUserAvatar()}
            className="button m-auto flex items-center gap-1"
            type="submit"
          >
            <span className="text-xl font-black md:text-2xl">Change Avatar</span>
          </button>
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            ref={userNameRef}
            className="input w-full md:py-3 md:px-4 md:text-2xl"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            required
          />
          <button className="button m-auto mt-4 flex items-center gap-1" type="submit">
            <span className="text-xl font-black md:text-2xl">Submit</span>
            <img className="h-6 w-6 md:h-8 md:w-8" src={SubmitArrow} alt="Submit Arrow" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default User;
