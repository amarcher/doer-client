import React from 'react';
import { UserFragment as UserFragmentType } from '../fragments/__generated__/UserFragment';
import PreloadedImage from './PreloadedImage';

import './Avatar.css';

type Props = Partial<
  Pick<UserFragmentType, 'profilePic' | 'firstName' | 'lastName'>
> & {
  height: number;
  width: number;
};

export default function Avatar({
  profilePic,
  firstName,
  lastName,
  height,
  width,
}: Props) {
  return (
    <PreloadedImage
      src={profilePic?.hostedUrl || ''}
      height={height}
      width={width}
      className="Avatar"
      alt={`${firstName} ${lastName}`}
    />
  );
}
