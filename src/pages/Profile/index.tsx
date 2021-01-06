import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import PreloadedImage from '../../components/PreloadedImage';
import FollowButton from '../../components/FollowButton';
import Button from '../../components/Button';
import Title from '../../components/Title';
import usePageTitle from '../../hooks/usePageTitle';
import GetUser from '../../queries/GetUser';
import { GetUser as GetUserResponse } from '../../queries/__generated__/GetUser';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import Loading from '../../components/Loading';

import './Profile.css';

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>ERROR: {error?.message}</div>;
  }

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

      <p>{data?.user?.firstName || null}</p>
      <p>{data?.user?.lastName || null}</p>
      <p>{data?.user?.bio || null}</p>
      <p>{data?.user?.username || null}</p>
      <p>
        {data?.user?.followers?.length || 0} Follower
        {data?.user?.followers?.length !== 1 && 's'}
      </p>
      <p>{data?.user?.following?.length || 0} Following</p>

      {data?.user?.id === currentUserId && (
        <div>
          <Button href="/profile/edit">Edit</Button>
        </div>
      )}

      {data?.user?.id !== currentUserId && <FollowButton user={data?.user} />}
    </>
  );
}
