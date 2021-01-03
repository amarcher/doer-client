import { gql } from '@apollo/client';

export default gql`
  mutation UnfollowUser($userId: ID!, $recipientId: ID!) {
    unfollowUser(userId: $userId, recipientId: $recipientId)
  }
`;
