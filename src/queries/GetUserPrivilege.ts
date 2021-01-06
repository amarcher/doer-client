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

  const { data } = useQuery<GetUserPrivilegeResponse>(GetUserPrivilege, {
    variables: {
      userId: currentUserId,
    },

    skip: !currentUserId,
  });

  return data?.userPrivilege?.privilege;
}
