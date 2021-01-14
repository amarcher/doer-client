import React from 'react';
import Modal from './Modal';
import LoginButton from './LoginButton';

interface Props {
  isOpen?: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
}

export default function LoginModal({
  isOpen = false,
  onAfterOpen,
  onRequestClose,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      title="Please login to access that feature"
    >
      <LoginButton onComplete={onRequestClose} />
    </Modal>
  );
}
