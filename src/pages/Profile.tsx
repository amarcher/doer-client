import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import PreloadedImage from '../components/PreloadedImage';

import './Profile.css';

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  bio: string | null,
  followingIds: [number]
}

export const GET_USERS = gql`
  query GetUsers($id: Int) {
    users {
      id
      firstName
    }
    user(id: $id) {
      firstName
      lastName
      email
    }
  }
`;

function Profile() {
  const [id, setId] = useState(1);

  const { data, loading, error } = useQuery<{ users: User[], user: User }>(
    GET_USERS, {
      variables: {
        id,
      },
    }
  );

  return (
    <>
      <div className="Profile__hero">
        <PreloadedImage src="https://embark.com/wp-content/uploads/2019/08/Derick-Yang.png" height={500} width={500} />
      </div>

      <select onChange={(e) => setId(parseInt(e.target.value, 10))}>
        {data?.users?.map(({ id, firstName }) => (
          <option key={id} value={id}>{firstName}</option>
        ))}
      </select>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      <p>{data?.user?.firstName || null}</p>
      <p>{data?.user?.lastName || null}</p>
      <p>{data?.user?.email || null}</p>
    </>
  );
}

export default Profile;
