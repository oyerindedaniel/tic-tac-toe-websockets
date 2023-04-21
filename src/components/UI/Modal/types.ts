import { ReactNode } from 'react';

export interface Modal {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  children: ReactNode;
}

export interface ModalTitle {
  children: ReactNode;
}

export interface ModalBody {
  children: ReactNode;
}

export interface ModalFooter {
  children: ReactNode;
}
