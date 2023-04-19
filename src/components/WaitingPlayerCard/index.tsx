import { FC } from 'react';
import socket from '@/utils/socketio';

const WaitingPlayerCard: FC<{ userName: string; userPhotoId: string; socketID: string }> = ({
  userName,
  userPhotoId,
  socketID
}) => {
  const requestPlayer = () => {
    socket.emit('requestStartGame', { userName: userName.toUpperCase(), socketID, userPhotoId });
  };
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-blue p-4">
      <img
        className="h-12 w-12"
        src={`https://avatars.dicebear.com/api/big-smile/${userPhotoId}.svg?skinColor=variant07,variant08`}
        alt={`player ${userName}}'s avatar`}
      />
      <p className="mr-auto text-xl uppercase">@{userName}</p>
      <button className="button button--md" type="button" onClick={() => requestPlayer()}>
        <span className="text-md font-black md:text-lg">Request</span>
      </button>
    </div>
  );
};

export default WaitingPlayerCard;
