/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGlobalStoreContext } from '@/context';
import socket from '@/utils/socketio';
import { User, Message, Status } from '../../types';
import WaitingPlayerCard from '@/components/WaitingPlayerCard';
import RequestPlayerCard from '@/components/RequestPlayerCard';
import WaitingPlayerModal from '@/components/WaitingRoom/Modal';
import { useDisclosure } from '@/hooks/useDisclosure';

const WaitingRoom = () => {
  const {
    state: {
      user: { userName, userPhotoId },
      socketIO: { isConnected }
    }
  } = useGlobalStoreContext();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeUsers, setActiveUsers] = useState<Array<User>>([]);
  const [requestPlayers, setRequestPlayers] = useState<Array<User>>([]);
  const [requestedPlayer, setRequestedPlayer] = useState<User | undefined>();
  // const [successMessage, setSuccessMessage] = useState<Message | null>(null);

  // TODO: Refactor all socket.io listeners

  useEffect(() => {
    if (isConnected) {
      socket.emit('newUser', { userName, socketID: socket.id, userPhotoId });
    }
  }, [isConnected, userName, userPhotoId]);

  const onConnectedUsers = (data: Array<User>) => {
    setActiveUsers(data.filter((user) => user.socketID !== socket?.id));
  };

  const onGameRequestsUsers = (data: User) => {
    const { requests } = data || {};
    if (requests) setRequestPlayers(requests);
  };

  const handlePlayerRequest = (data: User) => {
    const { requests } = data || {};
    if (requests) {
      setActiveUsers((prevActiveUsers) => {
        return prevActiveUsers.map((user) => {
          const userInRequestPlayers = requests.some((u) => u.socketID === user.socketID);
          return userInRequestPlayers ? { ...user, asRequested: true } : user;
        });
      });
      setRequestPlayers(requests);
    }
  };

  const handleAcceptAcceptedPlayerRequest = () => {
    onOpen();
  };

  const handleDeclinePlayerRequest = (data: User) => {
    const { socketID } = data || {};
    setActiveUsers((prevActiveUsers) => {
      return prevActiveUsers.map((user) => {
        if (user.socketID === socketID) {
          return { ...user, acceptedRequest: false };
        }
        return user;
      });
    });
  };

  const handleDeclinePlayerResetRequest = (data: User) => {
    const { socketID } = data || {};
    setActiveUsers((prevActiveUsers) => {
      return prevActiveUsers.map((user) => {
        // asRequested: false enables the request button to allow request resend
        if (user.socketID === socketID) return { ...user, asRequested: false };
        return user;
      });
    });
    setRequestedPlayer(undefined);
  };

  const handleAcceptPlayerRequest = (data: User) => {
    const { socketID, acceptedRequest, requests } = data || {};

    console.log(acceptedRequest);
    setActiveUsers((prevActiveUsers) => {
      return prevActiveUsers.map((user) => {
        if (user.socketID === socketID && acceptedRequest && requests) {
          console.log('ddd');
          const isRequestUserRequestAccepted = requests.some(
            (u) => u.socketID === socket.id && u.isRequestAccepted
          );
          return { ...user, acceptedRequest: isRequestUserRequestAccepted };
        }
        return user;
      });
    });
    console.log('danna');
  };

  const handleRequestedPlayerRequest = (data: User) => {
    setRequestedPlayer(data);
  };

  socket.on('allConnectedUsers', onConnectedUsers);
  socket.on('allGameRequestsUsers', onGameRequestsUsers);
  socket.on('requestPlayer2', handlePlayerRequest);
  socket.on('acceptPlayerRequest', handleAcceptPlayerRequest);
  socket.on('acceptAcceptedPlayerRequest', handleAcceptAcceptedPlayerRequest);
  socket.on('declinePlayerResetRequest', handleDeclinePlayerResetRequest);
  socket.on('declinePlayerRequest', handleDeclinePlayerRequest);
  socket.on('requestedPlayer', handleRequestedPlayerRequest);

  useEffect(() => {
    const handleStatusMessage = (data: Message) => {
      if (data.status === Status.WARNING) toast.error(data.message);
      if (data.status === Status.ERROR) {
        toast.error(data.message);
        navigate('/game/user');
      }

      if (data.status === Status.SUCCESS) {
        const activeUsersUpdated = activeUsers.map((user) => {
          if (user.socketID === data.messageSocketId) return { ...user, successMessage: data };
          return user;
        });
        setActiveUsers(activeUsersUpdated);
      }
    };

    socket.on('status', handleStatusMessage);

    return () => {
      socket.off('status', handleStatusMessage);
    };
  }, [activeUsers, navigate]);

  return (
    <>
      <WaitingPlayerModal isOpen={isOpen} onClose={onClose} />
      <section className="flex h-[100vh] w-full items-center justify-center bg-blue px-4">
        <div className="z-10 w-full max-w-[65rem] rounded-lg bg-white p-4 sm:p-8">
          <h2 className="text-2xl font-black uppercase">Waiting Room</h2>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold uppercase">@{userName}</p>
              <img
                className="h-8 w-8"
                src={`https://avatars.dicebear.com/api/big-smile/${userPhotoId}.svg?skinColor=variant07,variant08`}
                alt={`player ${userName}'s avatar`}
              />
            </div>
            {requestedPlayer && (
              <div className="flex items-center gap-2">
                <p className="text-lg font-normal">Awaiting @{requestedPlayer.userName}</p>
                <img
                  className="h-8 w-8"
                  src={`https://avatars.dicebear.com/api/big-smile/${requestedPlayer.userPhotoId}.svg?skinColor=variant07,variant08`}
                  alt={`player ${userName}'s avatar`}
                />
                <p className="text-lg font-normal">to accept request</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="h-full min-h-[15rem] flex-[50%] text-lg sm:min-h-[25rem]">
              <p className="mb-2">Waiting Players</p>
              <div className="flex flex-col gap-2">
                {activeUsers.length > 0 &&
                  activeUsers.map((user) => (
                    <WaitingPlayerCard
                      key={user.socketID}
                      userName={user.userName}
                      userPhotoId={user.userPhotoId}
                      socketID={user?.socketID}
                      asRequested={user?.asRequested || false}
                      acceptedRequest={user?.acceptedRequest || false}
                      successMessage={user.successMessage}
                      requestedPlayer={requestedPlayer}
                    />
                  ))}
              </div>
            </div>
            <div className="h-full min-h-[15rem] flex-[50%] text-lg sm:min-h-[25rem]">
              <p className="mb-2">Requests</p>
              <div className="flex flex-col gap-2">
                {requestPlayers.length > 0 &&
                  requestPlayers.map((user) => (
                    <RequestPlayerCard
                      key={user.socketID}
                      userName={user.userName}
                      userPhotoId={user.userPhotoId}
                      socketID={user?.socketID}
                      requestedPlayer={requestedPlayer}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WaitingRoom;
