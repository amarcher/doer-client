import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';

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
