export interface Modal {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  modalTitle: string;
  modalBody: string;
}
