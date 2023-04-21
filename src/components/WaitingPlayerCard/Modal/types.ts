export interface WaitingPlayerModalType {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  modalTitle: string;
  modalBody: string;
}
