import { gql } from '@apollo/client';
import UserFragment from '../fragments/UserFragment';

interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  bio: string | null,
  // email: string
  // followingIds: [number]
}

export interface GetUserResponse {
  user: User
}

export default gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
