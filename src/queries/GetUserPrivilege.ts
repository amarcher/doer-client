import { useEffect, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useCurrentUserId } from './GetCurrentUserId';
import { GetUserPrivilege as GetUserPrivilegeResponse } from './__generated__/GetUserPrivilege';

const GetUserPrivilege = gql`
  query GetUserPrivilege($userId: ID!) {
    userPrivilege(userId: $userId) {
      privilege
      userId
    }
  }
`;

export default GetUserPrivilege;

export function useCurrentUserPrivilege() {
  const currentUserId = useCurrentUserId();
  const prevUserId = useRef(currentUserId);

  const { data, refetch } = useQuery<GetUserPrivilegeResponse>(
    GetUserPrivilege,
    {
      variables: {
        userId: currentUserId,
      },

      skip: !currentUserId,
    }
  );

  useEffect(() => {
    prevUserId.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId && currentUserId !== prevUserId.current) refetch();
  }, [currentUserId, refetch]);

  return data?.userPrivilege?.privilege;
}
