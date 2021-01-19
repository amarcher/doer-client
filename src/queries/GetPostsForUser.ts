import { gql } from '@apollo/client';
import PostFragment from '../fragments/PostFragment';

export default gql`
  query GetPostsForUser($userId: ID!) {
    postsForUser(userId: $userId) {
      ...PostFragment
    }
  }
  ${PostFragment}
`;
