import { useState } from 'react';
import { AvatarMan, SubmitArrow2 } from '@/assets/constants';

const User = () => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName('');
  };

  return (
    <section className="relative flex h-[100vh] w-full items-center justify-center bg-blue">
      <div className="absolute top-1/2 left-1/2 h-full max-h-[35rem] w-full max-w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lightBlue blur-3xl">
        &nbsp;
      </div>
      <div className="z-10 w-full max-w-[30rem] rounded-lg bg-transparent p-8">
        <div>
          <img className="m-auto h-24 w-24 md:h-28 md:w-28" src={AvatarMan} alt="Avatar" />
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full rounded-md py-2 px-2 text-xl font-black uppercase text-lightBlue placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow md:py-3 md:px-4 md:text-2xl"
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="button m-auto mt-4 flex items-center gap-1" type="submit">
              <span className="text-xl font-black md:text-2xl">Submit</span>
              <img className="h-6 w-6 md:h-8 md:w-8" src={SubmitArrow2} alt="Submit Arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default User;
