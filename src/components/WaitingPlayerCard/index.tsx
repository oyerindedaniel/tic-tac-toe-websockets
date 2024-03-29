import { FC, useEffect } from 'react';
import socket from '@/utils/socketio';
import { User } from '../../../types';
import WaitingPlayerCardModal from './Modal';
import { useDisclosure } from '@/hooks/useDisclosure';

const WaitingPlayerCard: FC<Partial<User> & { requestedPlayer: User | undefined }> = ({
  userName,
  userPhotoId,
  socketID,
  asRequested,
  acceptedRequest,
  successMessage,
  requestedPlayer
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen && !acceptedRequest) {
      onClose();
    }
  }, [acceptedRequest, isOpen, onClose]);

  const requestPlayer = () => {
    socket.emit('requestPlayer', {
      userName: userName?.toUpperCase() || '',
      socketID,
      userPhotoId
    });
  };
  return (
    <>
      <WaitingPlayerCardModal
        userName={userName || ''}
        userPhotoId={userPhotoId || ''}
        socketID={socketID}
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={successMessage?.title || ''}
        modalBody={successMessage?.message || ''}
      />
      <div className="flex items-center gap-3 rounded-md border-2 border-blue p-4">
        <img
          className="h-12 w-12"
          src={`https://avatars.dicebear.com/api/big-smile/${userPhotoId}.svg?skinColor=variant07,variant08`}
          alt={`player ${userName}}'s avatar`}
        />
        <p className="mr-auto text-lg uppercase">@{userName}</p>
        <button
          className="button button--md button--bg-lightBlue button--disabled"
          type="button"
          onClick={() => requestPlayer()}
          disabled={asRequested || !!requestedPlayer}
        >
          <span className="text-md font-black md:text-lg">Request</span>
        </button>

        {acceptedRequest && (
          <button
            className="button button--md button--bg-lightBlue"
            type="button"
            onClick={() => onOpen()}
          >
            <span className="text-md font-black md:text-lg">Open</span>
          </button>
        )}
      </div>
    </>
  );
};

export default WaitingPlayerCard;
