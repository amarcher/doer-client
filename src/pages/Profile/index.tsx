import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import PreloadedImage from '../../components/PreloadedImage';
import Title from '../../components/Title';
import usePageTitle from '../../hooks/usePageTitle';
import GetUser, { GetUserResponse } from '../../queries/GetUser';
import { currentUserIdVar } from '../../cache';

import './Profile.css';

type Props = RouteComponentProps<{ id?: string }>;

export default function Profile({
  match: {
    params: { id },
  },
}: Props) {
  const { data, loading, error } = useQuery<GetUserResponse>(GetUser, {
    variables: {
      id: id || currentUserIdVar(),
    },
  });

  usePageTitle(data?.user?.firstName || '');

  const src =
    data?.user?.profilePic?.hostedUrl ||
    'https://embark.com/wp-content/uploads/2019/08/Derick-Yang.png';

  return (
    <>
      {data && (
        <>
          <Title>{data?.user?.firstName}</Title>

          <div className="Profile__hero">
            <PreloadedImage src={src} height={500} width={500} />
          </div>
        </>
      )}

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      <p>{data?.user?.firstName || null}</p>
      <p>{data?.user?.lastName || null}</p>
      <p>{data?.user?.bio || null}</p>
      <p>{data?.user?.username || null}</p>
    </>
  );
}
