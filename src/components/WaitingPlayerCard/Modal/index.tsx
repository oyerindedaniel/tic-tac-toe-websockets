import { FC } from 'react';
import { Modal, ModalTitle, ModalBody, ModalFooter } from '@/components/UI/Modal';
import { WaitingPlayerModalType } from './types';

const WaitingPlayerModal: FC<WaitingPlayerModalType> = ({
  isOpen,
  onClose,
  modalBody,
  modalTitle
}) => {
  const declineAcceptedRequestPlayer = () => {};
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>{modalTitle}</ModalTitle>
      <ModalBody>{modalBody}</ModalBody>
      <ModalFooter>
        <div className="mt-4 ml-auto flex justify-end gap-3">
          <button
            className="button button--md button--bg-gray font-semibold"
            type="button"
            onClick={declineAcceptedRequestPlayer}
          >
            Cancel
          </button>
          <button
            className="button button--md button--bg-lightBlue font-semibold"
            type="button"
            onClick={onClose}
          >
            Accept
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default WaitingPlayerModal;
