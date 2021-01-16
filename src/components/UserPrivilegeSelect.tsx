import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import UpdateUserPriv from '../mutations/UpdateUserPriv';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import { PRIVILEGES } from '../constants';
import { GetUserPrivilege as GetUserPrivilegeResponse } from '../queries/__generated__/GetUserPrivilege';
import GetUserPrivilege, {
  useCurrentUserPrivilege,
} from '../queries/GetUserPrivilege';

interface Props {
  className?: string;
}

export default function UserPrivilegeSelect({ className }: Props) {
  const currentUserId = useCurrentUserId();
  const currentUserPrivilege = useCurrentUserPrivilege();
  const [privilege, setPrivilege] = useState(currentUserPrivilege);
  useEffect(() => {
    setPrivilege(currentUserPrivilege);
  }, [currentUserPrivilege]);

  const [updateUserPriv] = useMutation(UpdateUserPriv, {
    variables: {
      userId: currentUserId,
      privilege,
    },

    optimisticResponse: {
      updateUserPriv: {
        __typename: 'UserPrivilege',
        privilege,
        userId: currentUserId,
      },
    },

    update(cache, { data }) {
      if (data?.updateUserPriv?.privilege && data?.updateUserPriv?.userId) {
        cache.writeQuery<GetUserPrivilegeResponse>({
          query: GetUserPrivilege,
          data: {
            userPrivilege: {
              __typename: 'UserPrivilege',
              privilege: data.updateUserPriv.privilege,
              userId: data.updateUserPriv.userId,
            },
          },
          variables: {
            userId: data.updateUserPriv.userId,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (privilege && privilege !== currentUserPrivilege) updateUserPriv();
  }, [currentUserPrivilege, privilege, updateUserPriv]);

  const selectUserPriv = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPrivilege(e.target.value);
    },
    []
  );

  return (
    <select onChange={selectUserPriv} value={privilege} className={className}>
      {Object.values(PRIVILEGES).map((priv) => (
        <option key={priv} value={priv} id={priv}>
          {priv}
        </option>
      ))}
    </select>
  );
}
