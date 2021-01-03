import React, { useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { UserWithFollowsFragment } from '../fragments/__generated__/UserWithFollowsFragment';
import FollowUser from '../mutations/FollowUser';
import UnfollowUser from '../mutations/UnfollowUser';
import { FollowUser as FollowUserResponse } from '../mutations/__generated__/FollowUser';
import { UnfollowUser as UnfollowUserResponse } from '../mutations/__generated__/UnfollowUser';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Button from './Button';

import './Button.css';

type Props = {
  user?: UserWithFollowsFragment | null;
};

export default function FollowButton({ user }: Props) {
  const currentUserId = useCurrentUserId();

  const isFollowing = useMemo(
    () => user?.followers.some((follower) => follower?.id === currentUserId),
    [user?.followers, currentUserId]
  );

  const [followUser] = useMutation<FollowUserResponse>(FollowUser, {
    variables: {
      userId: currentUserId,
      recipientId: user?.id,
    },
  });

  const [unfollowUser] = useMutation<UnfollowUserResponse>(UnfollowUser, {
    variables: {
      userId: currentUserId,
      recipientId: user?.id,
    },
  });

  return (
    <Button
      className="FollowButton"
      disabled={!user || !currentUserId}
      onPress={isFollowing ? unfollowUser : followUser}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
