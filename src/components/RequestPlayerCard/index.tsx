import { FC } from 'react';
import socket from '@/utils/socketio';
import { User } from '../../../types';

const RequestPlayerCard: FC<Partial<User>> = ({ userName, userPhotoId, socketID }) => {
  const acceptRequestPlayer = () => {
    socket.emit('acceptRequestPlayer', {
      userName: userName?.toUpperCase() || '',
      socketID,
      userPhotoId
    });
  };

  const declineRequestPlayer = () => {
    socket.emit('declineRequestPlayer', {
      userName: userName?.toUpperCase() || '',
      socketID,
      userPhotoId
    });
  };

  return (
    <div className="flex items-center gap-3 rounded-md border-2 border-blue p-4">
      <img
        className="h-12 w-12"
        src={`https://avatars.dicebear.com/api/big-smile/${userPhotoId}.svg?skinColor=variant07,variant08`}
        alt={`player ${userName}}'s avatar`}
      />
      <p className="mr-auto text-lg uppercase">@{userName}</p>
      <button
        className="button button--md button--bg-white"
        aria-label="decline player request"
        type="button"
        onClick={() => declineRequestPlayer()}
      >
        <span className="text-md font-black md:text-lg">Decline</span>
      </button>
      <button
        className="button button--md button--bg-lightBlue"
        aria-label="accept player request"
        type="button"
        onClick={() => acceptRequestPlayer()}
      >
        <span className="text-md font-black md:text-lg">Accept</span>
      </button>
    </div>
  );
};

export default RequestPlayerCard;
