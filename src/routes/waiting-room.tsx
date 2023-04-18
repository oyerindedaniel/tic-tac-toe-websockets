import { useGlobalStoreContext } from '@/context';

// import { socket } from '@/utils/socketio';

const WaitingRoom = () => {
  const { state } = useGlobalStoreContext();
  return (
    <section className="flex h-[100vh] w-full items-center justify-center bg-blue px-4">
      <div className="z-10 w-full max-w-[40rem] rounded-lg bg-white p-4 sm:p-8">
        <h2 className="text-2xl font-black uppercase">Waiting Room</h2>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold uppercase">@{state.user.userName}</p>
          <img
            className="h-8 w-8"
            src={`https://avatars.dicebear.com/api/big-smile/${state.user.userPhotoId}.svg?skinColor=variant07,variant08`}
            alt={`player ${state.user.userName}}'s avatar`}
          />
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="h-full min-h-[15rem] flex-[65%] px-2 text-lg sm:min-h-[25rem]">
            <p>Waiting Players</p>
          </div>
          <div className="min-h-[10rem] flex-[35%] px-2  text-lg">
            <p>Requests</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingRoom;
