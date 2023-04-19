import { FC } from 'react';

const WaitingPlayerCard: FC<{ userName: string; userPhotoId: string }> = ({
  userName,
  userPhotoId
}) => {
  return (
    <div className="flex p-4">
      <img
        className="h-8 w-8"
        src={`https://avatars.dicebear.com/api/big-smile/${userPhotoId}.svg?skinColor=variant07,variant08`}
        alt={`player ${userName}}'s avatar`}
      />
      <p>{userName}</p>
    </div>
  );
};

export default WaitingPlayerCard;
