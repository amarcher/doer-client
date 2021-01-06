import { gql } from '@apollo/client';

export default gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
