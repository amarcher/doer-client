import React from 'react';

import usePageTitle from '../../hooks/usePageTitle';
import Logo from '../../components/Logo';
import Title from '../../components/Title';

import './NotFound.css';

export default function NotFound() {
  usePageTitle('Not Found');

  return (
    <>
      <Title>404: That's an error</Title>

      <div className="NotFound__hero">
        <Logo />
      </div>
    </>
  );
}
