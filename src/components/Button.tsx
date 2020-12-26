import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './Button.css';

type Props = {
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  href?: string;
  className?: string,
  preventDefault?: boolean;
};

export default function Button({ disabled, className, children, onPress, preventDefault, href }: Props) {
  const history = useHistory();

  const onClick = useCallback((e: React.SyntheticEvent) => {
    if (preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (href) {
      history.push(href);
    }

    if (onPress) onPress();
  }, [onPress, href, history, preventDefault])

  const title = typeof children === 'string' ? children : '';
  
  return (
    <button
      type="button"
      className={className ? `Button ${className}` : 'Button'}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
