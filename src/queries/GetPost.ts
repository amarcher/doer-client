import { gql } from '@apollo/client';
import PostFragment from '../fragments/PostFragment';

export default gql`
  query GetPost($postId: ID!) {
    post(postId: $postId) {
      ...PostFragment
    }
  }
  ${PostFragment}
`;
