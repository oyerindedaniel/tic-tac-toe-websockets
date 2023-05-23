import { FC, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '@/utils/socketio';
import { Modal, ModalTitle, ModalBody } from '@/components/UI/Modal';
import { WaitingRoomModalType } from './types';

const WaitingPlayerModal: FC<WaitingRoomModalType> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(5);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isOpen) {
      intervalId.current = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      if (intervalId?.current) clearInterval(intervalId.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (countdown === 0) {
      if (intervalId?.current) clearInterval(intervalId.current);
      navigate(`/game/${socket.id}`);
    }
  }, [countdown, navigate]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalTitle>Game Starting 🥶 ...</ModalTitle>
      <ModalBody>
        <p className="text-center text-3xl font-bold text-blue">{countdown}</p>
      </ModalBody>
    </Modal>
  );
};
export default WaitingPlayerModal;
