import React from 'react';
import Logo from './Logo';
import Title from './Title';

import './Loading.css';

export default function Loading() {
  return (
    <>
      <Title />

      <div className="Loading__hero">
        <Logo />
      </div>

      <div>Loading...</div>
    </>
  );
}
