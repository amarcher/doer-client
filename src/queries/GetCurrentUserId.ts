import { gql, useReactiveVar } from '@apollo/client';
import { currentUserIdVar } from '../cache';

export default gql`
  query GetCurrentUserId {
    currentUserId @client
    tokenId @client
  }
`;

export function useCurrentUserId() {
  return useReactiveVar(currentUserIdVar);
}
