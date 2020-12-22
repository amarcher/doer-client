import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import PreloadedImage from '../components/PreloadedImage';

import './Profile.css';

interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  bio: string | null,
  followingIds: [number]
}

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      firstName
      lastName
      bio
    }
  }
`;

type Props = RouteComponentProps<{ id?: string }>;

function Profile({ match: { params: { id = '1' } } }: Props) {
  const { data, loading, error } = useQuery<{ user: User }>(
    GET_USER, {
      variables: {
        id: id ? parseInt(id, 10) : 1,
      },
    }
  );

  return (
    <>
      <div className="Profile__hero">
        <PreloadedImage src="https://embark.com/wp-content/uploads/2019/08/Derick-Yang.png" height={500} width={500} />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      <p>{data?.user?.firstName || null}</p>
      <p>{data?.user?.lastName || null}</p>
      <p>{data?.user?.bio || null}</p>
    </>
  );
}

export default Profile;
