/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useGlobalStoreContext } from '@/context';
import socket from '@/utils/socketio';
import { User } from '../../types';
import WaitingPlayerCard from '@/components/WaitingPlayerCard';

const WaitingRoom = () => {
  const {
    state: {
      user: { userName, userPhotoId },
      socketIO: { isConnected }
    }
  } = useGlobalStoreContext();
  const [activeUsers, setActiveUsers] = useState<Array<User> | []>([]);
  const [isRequestPlayer2, setIsRequestPlayer2] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected) {
      socket.emit('newUser', { userName, socketID: socket.id, userPhotoId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  // useEffect(() => {
  //   socket.on('activeUsers', (data: Array<User>) => {
  //     console.log(data);
  //     setActiveUsers(() => [...data]);
  //   });
  // }, []);

  useEffect(() => {
    if (isConnected) {
      socket.on('allConnectedUsers', (data: Array<User>) => {
        const filterOutSelf = data.filter((user) => user.socketID !== socket?.id);
        setActiveUsers(() => [...filterOutSelf]);
      });
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      socket.on('requestPlayer2', (data: User) => {
        setIsRequestPlayer2(true);
      });
    }
  }, [isConnected]);

  console.log(activeUsers);

  return (
    <section className="flex h-[100vh] w-full items-center justify-center bg-blue px-4">
      <div className="z-10 w-full max-w-[40rem] rounded-lg bg-white p-4 sm:p-8">
        <h2 className="text-2xl font-black uppercase">Waiting Room</h2>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold uppercase">@{userName}</p>
          <img
            className="h-8 w-8"
            src={`https://avatars.dicebear.com/api/big-smile/${userPhotoId}.svg?skinColor=variant07,variant08`}
            alt={`player ${userName}}'s avatar`}
          />
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="h-full min-h-[15rem] flex-[65%] text-lg sm:min-h-[25rem]">
            <p className="mb-2">Waiting Players</p>
            <div className="flex flex-col gap-2">
              {activeUsers.map((user) => (
                <WaitingPlayerCard
                  key={user.socketID}
                  userName={user.userName}
                  userPhotoId={user.userPhotoId}
                  socketID={user?.socketID || ''}
                />
              ))}
            </div>
          </div>
          <div className="min-h-[10rem] flex-[35%] px-2 text-lg">
            <p>Requests</p>
            {isRequestPlayer2 && (
              <button className="button button--md" type="submit">
                Accept
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingRoom;
