import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './Button.css';

type Props = {
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  href?: string;
};

export default function Button({ disabled, children, onPress, href }: Props) {
  const history = useHistory();

  const onClick = useCallback(() => {
    if (href) {
      history.push(href);
    }

    if (onPress) onPress();
  }, [onPress, href, history])

  const title = typeof children === 'string' ? children : '';
  
  return (
    <button
      type="button"
      className="Button"
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
