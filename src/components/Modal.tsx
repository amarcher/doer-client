import React from 'react';
import ReactModal from 'react-modal';
import { ROOT_ELEMENT } from '../constants';
import Button from './Button';

import './Modal.css';

ReactModal.setAppElement(`#${ROOT_ELEMENT}`);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
  },
};

interface Props {
  isOpen?: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
  title?: string;
  children: React.ReactElement;
}

export default function Modal({
  isOpen = false,
  onAfterOpen,
  onRequestClose,
  title = '',
  children,
}: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      style={customStyles}
    >
      <div className="Modal__header">
        <Button
          className="Modal__close_button"
          onPress={onRequestClose}
          title="Close"
        >
          x
        </Button>
        <div className="Modal__title">{title}</div>
      </div>
      <div className="Modal__content">{children}</div>
    </ReactModal>
  );
}
