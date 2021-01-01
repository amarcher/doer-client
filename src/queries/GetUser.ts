import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';

export default gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserWithFollowsFragment
    }
  }
  ${UserWithFollowsFragment}
`;
