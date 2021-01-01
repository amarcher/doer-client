import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { useCurrentUserId } from '../../queries/GetCurrentUserId';

type Props = RouteComponentProps<{}, any, { redirect?: Location }>;

export default function Signup({
  history: { push, replace },
  location: { state },
}: Props) {
  const currentUserId = useCurrentUserId();

  useEffect(() => {
    if (currentUserId && state?.redirect) {
      push(state?.redirect);
    } else if (currentUserId) {
      replace('/');
    }
  }, [currentUserId, push, replace, state?.redirect]);

  return <div>Please log in to access that page</div>;
}
