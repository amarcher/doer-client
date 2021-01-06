import React from 'react';

import usePageTitle from '../../hooks/usePageTitle';
import PreloadedImage from '../../components/PreloadedImage';
import Title from '../../components/Title';
import logo from '../../logo2.svg';

import './NotFound.css';

export default function NotFound() {
  usePageTitle('Not Found');

  return (
    <>
      <Title>404: That's an error</Title>

      <div className="NotFound__hero">
        <PreloadedImage src={logo} height={300} width={300} useImg />
      </div>
    </>
  );
}
