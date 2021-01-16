import { gql } from '@apollo/client';

export default gql`
  mutation UpdateUserPriv($userId: ID!, $privilege: String!) {
    updateUserPriv(userId: $userId, privilege: $privilege) {
      userId
      privilege
    }
  }
`;
