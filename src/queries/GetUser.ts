import { useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';
import { useCurrentUserId } from './GetCurrentUserId';
import { GetUser as GetUserResult } from './__generated__/GetUser';

const GetUser = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserWithFollowsFragment
    }
  }
  ${UserWithFollowsFragment}
`;

export default GetUser;

export function useCurrentUser() {
  const currentUserId = useCurrentUserId();
  const prevUserId = useRef(currentUserId);

  const { data, refetch } = useQuery<GetUserResult>(GetUser, {
    variables: {
      id: currentUserId,
    },

    skip: !currentUserId,
  });

  useEffect(() => {
    prevUserId.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId && currentUserId !== prevUserId.current) refetch();
  }, [currentUserId, refetch]);

  return data?.user;
}
