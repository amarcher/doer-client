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

    update(cache, { data }) {
      cache.writeQuery<GetUserPrivilegeResponse>({
        query: GetUserPrivilege,
        variables: {
          userId: currentUserId,
        },
        data,
      });
    },
  });

  useEffect(() => {
    if (privilege) updateUserPriv();
  }, [privilege, updateUserPriv]);

  const selectUserPriv = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPrivilege(e.target.value);
    },
    []
  );

  return (
    <select
      onChange={selectUserPriv}
      defaultValue={privilege}
      className={className}
    >
      {Object.values(PRIVILEGES).map((priv) => (
        <option key={priv} value={priv} id={priv}>
          {priv}
        </option>
      ))}
    </select>
  );
}
