import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import PreloadedImage from '../../components/PreloadedImage';
import Button from '../../components/Button';
import Title from '../../components/Title';
import usePageTitle from '../../hooks/usePageTitle';
import GetUser from '../../queries/GetUser';
import { GetUser as GetUserResponse } from '../../queries/__generated__/GetUser';

import './Profile.css';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';

type Props = RouteComponentProps<{ id?: string }>;

export default function Profile({
  match: {
    params: { id },
  },
}: Props) {
  const currentUserId = useCurrentUserId();
  const { data, loading, error } = useQuery<GetUserResponse>(GetUser, {
    variables: {
      id: id || currentUserId,
    },
  });

  usePageTitle(data?.user?.firstName || '');

  const src = data?.user?.profilePic?.hostedUrl || '';

  return (
    <>
      {data && (
        <>
          <Title>{data?.user?.firstName}</Title>

          <div className="Profile__hero">
            <PreloadedImage
              src={src}
              height={300}
              width={300}
              className="Profile__photo"
            />
          </div>
        </>
      )}

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      <p>{data?.user?.firstName || null}</p>
      <p>{data?.user?.lastName || null}</p>
      <p>{data?.user?.bio || null}</p>
      <p>{data?.user?.username || null}</p>

      {data?.user?.id === currentUserId && (
        <div>
          <Button href="/profile/edit">Edit</Button>
        </div>
      )}
    </>
  );
}
