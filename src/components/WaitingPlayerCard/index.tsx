import { FC } from 'react';
import socket from '@/utils/socketio';
import { User } from '../../../types';

const WaitingPlayerCard: FC<Partial<User>> = ({ userName, userPhotoId, socketID, asRequested }) => {
  const requestPlayer = () => {
    socket.emit('requestPlayer', {
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
      {!asRequested && (
        <button
          className="button button--md button--bg-lightBlue"
          type="button"
          onClick={() => requestPlayer()}
        >
          <span className="text-md font-black md:text-lg">Request</span>
        </button>
      )}
    </div>
  );
};

export default WaitingPlayerCard;
