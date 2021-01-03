import { gql } from '@apollo/client';

export default gql`
  mutation FollowUser($userId: ID!, $recipientId: ID!) {
    followUser(userId: $userId, recipientId: $recipientId)
  }
`;
