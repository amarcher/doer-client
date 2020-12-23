import React from 'react';

import './Title.css';

type Props = {
  children?: React.ReactNode;
}

export default function Title({ children }: Props) {
  return <h1 className="Title">{children}</h1>;
}