import { FC } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter } from '@/components/UI/Modal';
import socket from '@/utils/socketio';
import { WaitingPlayerModalType } from './types';

const WaitingPlayerCardModal: FC<WaitingPlayerModalType> = ({
  userName,
  userPhotoId,
  socketID,
  isOpen,
  onClose,
  modalBody,
  modalTitle
}) => {
  const declineAcceptedRequestPlayer = () => {
    socket.emit('declineAcceptedPlayerRequest', {
      userName: userName?.toUpperCase() || '',
      socketID,
      userPhotoId
    });
  };

  const acceptAcceptedPlayerRequest = () => {
    socket.emit('acceptAcceptedPlayerRequest', {
      userName: userName?.toUpperCase() || '',
      socketID,
      userPhotoId
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>{modalTitle}</ModalTitle>
      <ModalBody>{modalBody}</ModalBody>
      <ModalFooter>
        <div className="mt-4 ml-auto flex justify-end gap-3">
          <button
            className="button button--md button--bg-gray font-semibold"
            type="button"
            onClick={() => {
              declineAcceptedRequestPlayer();
              onClose();
            }}
          >
            Decline
          </button>
          <button
            className="button button--md button--bg-lightBlue font-semibold"
            type="button"
            onClick={() => {
              acceptAcceptedPlayerRequest();
              onClose();
            }}
          >
            Accept
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default WaitingPlayerCardModal;
