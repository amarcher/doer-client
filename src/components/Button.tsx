import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './Button.css';

type Props = {
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  href?: string;
  title?: string;
  className?: string;
  preventDefault?: boolean;
};

export default function Button({
  disabled,
  className,
  children,
  title,
  onPress,
  preventDefault,
  href,
}: Props) {
  const history = useHistory();

  const onClick = useCallback(
    (e: React.SyntheticEvent) => {
      if (preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (href) {
        history.push(href);
      }

      if (onPress) onPress();
    },
    [onPress, href, history, preventDefault]
  );

  return (
    <button
      type="button"
      className={className ? `Button ${className}` : 'Button'}
      disabled={disabled}
      title={title || (typeof children === 'string' ? children : '')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
