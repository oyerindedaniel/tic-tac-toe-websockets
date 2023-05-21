export interface WaitingPlayerModalType {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  modalTitle: string;
  modalBody: string;
  userName: string;
  userPhotoId: string;
  socketID: string | undefined;
}
