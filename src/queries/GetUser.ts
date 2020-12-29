import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';
import { UserWithFollows } from '../mutations/CreateUser';

export interface GetUserResponse {
  user: UserWithFollows;
}

export default gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserWithFollowsFragment
    }
  }
  ${UserWithFollowsFragment}
`;
