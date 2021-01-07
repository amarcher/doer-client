import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useCurrentUserId } from './GetCurrentUserId';
import { GetUserPrivilege as GetUserPrivilegeResponse } from './__generated__/GetUserPrivilege';

const GetUserPrivilege = gql`
  query GetUserPrivilege($userId: ID!) {
    userPrivilege(userId: $userId) {
      privilege
    }
  }
`;

export default GetUserPrivilege;

export function useCurrentUserPrivilege() {
  const currentUserId = useCurrentUserId();

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
    refetch();
  }, [currentUserId, refetch]);

  return data?.userPrivilege?.privilege;
}
