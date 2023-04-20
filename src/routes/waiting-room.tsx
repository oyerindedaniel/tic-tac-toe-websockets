/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGlobalStoreContext } from '@/context';
import socket from '@/utils/socketio';
import { User, Message, Status } from '../../types';
import WaitingPlayerCard from '@/components/WaitingPlayerCard';
import RequestPlayerCard from '@/components/RequestPlayerCard';

const WaitingRoom = () => {
  const {
    state: {
      user: { userName, userPhotoId },
      socketIO: { isConnected }
    }
  } = useGlobalStoreContext();
  const [activeUsers, setActiveUsers] = useState<Array<User>>([]);
  const [requestPlayers, setRequestPlayers] = useState<Array<User>>([]);
  const [isRequestPlayers, setIsRequestPlayers] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected) {
      socket.emit('newUser', { userName, socketID: socket.id, userPhotoId });
    }
  }, [isConnected, userName, userPhotoId]);

  // useEffect(() => {
  //   socket.on('activeUsers', (data: Array<User>) => {
  //     console.log(data);
  //     setActiveUsers(() => [...data]);
  //   });
  // }, []);

  useEffect(() => {
    const onConnectedUsers = (data: Array<User>) => {
      const filterOutSelf = data.filter((user) => user.socketID !== socket?.id);
      setActiveUsers(filterOutSelf);
    };

    if (isConnected) {
      socket.on('allConnectedUsers', onConnectedUsers);
    }

    return () => {
      socket.off('allConnectedUsers', onConnectedUsers);
    };
  }, [isConnected]);

  useEffect(() => {
    const handleRequestPlayer = (data: User) => {
      if (data?.requests && data?.requests?.length > 0) {
        const activeUsersUpdated = activeUsers.map((user) => {
          const userInRequestPlayers = data?.requests?.some((u) => u.socketID === user.socketID);
          if (userInRequestPlayers) {
            return { ...user, asRequested: true };
          }
          return { user, asRequested: false };
        });
        setActiveUsers(activeUsersUpdated);
        setIsRequestPlayers(true);
        setRequestPlayers(data.requests as Array<User>);
      }
    };

    if (isConnected) {
      socket.on('requestPlayer2', handleRequestPlayer);
    }

    return () => {
      socket.off('requestPlayer2', handleRequestPlayer);
    };
  }, [activeUsers, isConnected]);

  useEffect(() => {
    const handleStatusMessage = (data: Message) => {
      if (data.status === Status.WARNING) toast.error(data.message);
    };
    if (isConnected) {
      socket.on('status', handleStatusMessage);
    }
    return () => {
      socket.off('status', handleStatusMessage);
    };
  }, [isConnected]);

  return (
    <section className="flex h-[100vh] w-full items-center justify-center bg-blue px-4">
      <div className="z-10 w-full max-w-[65rem] rounded-lg bg-white p-4 sm:p-8">
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
          <div className="h-full min-h-[15rem] flex-[50%] text-lg sm:min-h-[25rem]">
            <p className="mb-2">Waiting Players</p>
            <div className="flex flex-col gap-2">
              {activeUsers.length > 0 &&
                activeUsers.map((user) => (
                  <WaitingPlayerCard
                    key={user.socketID}
                    userName={user.userName}
                    userPhotoId={user.userPhotoId}
                    socketID={user?.socketID || ''}
                    asRequested={user?.asRequested || false}
                  />
                ))}
            </div>
          </div>
          <div className="min-h-[10rem] flex-[50%] px-2 text-lg">
            <p className="mb-2">Requests</p>
            <div className="flex flex-col gap-2">
              {isRequestPlayers &&
                requestPlayers.length > 0 &&
                requestPlayers.map((user) => (
                  <RequestPlayerCard
                    key={user.socketID}
                    userName={user.userName}
                    userPhotoId={user.userPhotoId}
                    socketID={user?.socketID || ''}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitingRoom;
