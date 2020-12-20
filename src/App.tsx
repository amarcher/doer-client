import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './App.css';

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

function App() {
  const [id, setId] = useState(1);

  const { data, loading, error } = useQuery<{ users: User[], user: User }>(
    GET_USERS, {
      variables: {
        id,
      },
    }
  );

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
