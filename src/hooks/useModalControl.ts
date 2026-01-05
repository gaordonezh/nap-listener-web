import { useState } from 'react';

interface Modal {
  type: string;
  data: any;
}

const useModalControl = () => {
  const [modal, setModal] = useState<Modal>({ type: '', data: null });

  const openModal = (type: string, data?: any) => setModal({ type, data });
  const handleClose = () => setModal({ type: '', data: null });
  const isOpen = (type: string) => modal.type === type;

  return { openModal, handleClose, isOpen, modalData: modal.data };
};

export default useModalControl;
