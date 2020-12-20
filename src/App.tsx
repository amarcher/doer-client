import React from 'react';
import { gql, useQuery } from '@apollo/client';
import './App.css';


export const GET_USERS = gql`
  query GetCategories {
    users {
      firstName
      lastName
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery<any>(
    GET_USERS
  );

  return (
    <div className="App">
      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      {data?.users && data.users.map((user: { firstName: String }) => user.firstName)}
    </div>
  );
}

export default App;
