import { gql } from '@apollo/client';

export default gql`
  mutation Clap($userId: ID!, $postId: ID!) {
    clap(userId: $userId, postId: $postId)
  }
`;
