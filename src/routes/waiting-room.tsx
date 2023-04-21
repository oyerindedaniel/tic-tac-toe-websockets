/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGlobalStoreContext } from '@/context';
import socket from '@/utils/socketio';
import { User, Message, Status } from '../../types';
import WaitingPlayerCard from '@/components/WaitingPlayerCard';
import RequestPlayerCard from '@/components/RequestPlayerCard';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Modal } from '@/components/UI/Modal';

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
  const [acceptedRequest, setAcceptedRequest] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (isConnected) {
      socket.emit('newUser', { userName, socketID: socket.id, userPhotoId });
    }
  }, [isConnected, userName, userPhotoId]);

  useEffect(() => {
    const onConnectedUsers = (data: Array<User>) => {
      const filterOutSelf = data.filter((user) => user.socketID !== socket?.id);
      setActiveUsers(filterOutSelf);
    };

    socket.on('allConnectedUsers', onConnectedUsers);
    return () => {
      socket.off('allConnectedUsers', onConnectedUsers);
    };
  }, []);

  useEffect(() => {
    const handleRequestPlayer = (data: User) => {
      if (data?.requests && data?.requests?.length > 0) {
        const activeUsersUpdated = activeUsers.map((user) => {
          const userInRequestPlayers = data?.requests?.some((u) => u.socketID === user.socketID);
          if (userInRequestPlayers) {
            return { ...user, asRequested: true };
          }
          return user;
        });
        setActiveUsers(activeUsersUpdated);
        setRequestPlayers(data.requests as Array<User>);
      }
    };
    socket.on('requestPlayer2', handleRequestPlayer);

    return () => {
      socket.off('requestPlayer2', handleRequestPlayer);
    };
  }, [activeUsers]);

  useEffect(() => {
    const handleAcceptRequestPlayer = (data: User) => {
      if (data?.acceptedRequest) setAcceptedRequest(true);
    };

    socket.on('acceptRequestPlayer', handleAcceptRequestPlayer);

    return () => {
      socket.off('acceptRequestPlayer', handleAcceptRequestPlayer);
    };
  }, [navigate]);

  useEffect(() => {
    const handleStatusMessage = (data: Message) => {
      if (data.status === Status.WARNING) toast.error(data.message);
      if (data.status === Status.ERROR) {
        toast.error(data.message);
        navigate('/game/user');
      }

      if (data.status === Status.SUCCESS) {
        setSuccessMessage(data);
        onOpen();
      }
    };

    socket.on('status', handleStatusMessage);

    return () => {
      socket.off('status', handleStatusMessage);
    };
  }, [navigate, onOpen]);

  //   <button type="button" onClick={onOpen}>
  //   Open Disclosure
  // </button>

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={successMessage?.title || ''}
        modalBody={successMessage?.message || ''}
      />
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
                {requestPlayers.length > 0 &&
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
    </>
  );
};

export default WaitingRoom;
