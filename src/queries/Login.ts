import { gql } from '@apollo/client';
import { UserWithFollows } from '../mutations/CreateUser';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';

export interface LoginResponse {
  user: UserWithFollows;
  sessionToken: string;
}

export default gql`
  query Login {
    login {
      user {
        ...UserWithFollowsFragment
      }
      sessionToken
    }
  }
  ${UserWithFollowsFragment}
`;
