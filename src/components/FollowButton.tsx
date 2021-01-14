import React, { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';
import { UserWithFollowsFragment as UserWithFollowsFragmentType } from '../fragments/__generated__/UserWithFollowsFragment';
import GetUser from '../queries/GetUser';
import FollowUser from '../mutations/FollowUser';
import UnfollowUser from '../mutations/UnfollowUser';
import { FollowUser as FollowUserResponse } from '../mutations/__generated__/FollowUser';
import { UnfollowUser as UnfollowUserResponse } from '../mutations/__generated__/UnfollowUser';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Button from './Button';
import useLoginModal from '../hooks/useLoginModal';

import './FollowButton.css';

type Props = {
  user?: UserWithFollowsFragmentType | null;
};

export default function FollowButton({ user }: Props) {
  const currentUserId = useCurrentUserId();
  const { openLoginModal } = useLoginModal();

  const isFollowing = useMemo(
    () => user?.followers.some((follower) => follower?.id === currentUserId),
    [user?.followers, currentUserId]
  );

  const [followUser] = useMutation<FollowUserResponse>(FollowUser, {
    variables: {
      userId: currentUserId,
      recipientId: user?.id,
    },

    refetchQueries: [{ query: GetUser, variables: { id: user?.id } }],
  });

  const [unfollowUser] = useMutation<UnfollowUserResponse>(UnfollowUser, {
    variables: {
      userId: currentUserId,
      recipientId: user?.id,
    },

    optimisticResponse: {
      unfollowUser: true,
    },

    update(cache, { data }) {
      const fragmentOptions = {
        id: `User:${user?.id}`,
        fragment: UserWithFollowsFragment,
        fragmentName: 'UserWithFollowsFragment',
      };
      const existingUser = cache.readFragment<UserWithFollowsFragmentType>(
        fragmentOptions
      );

      if (existingUser && data) {
        cache.writeFragment({
          ...fragmentOptions,
          data: {
            ...existingUser,
            followers: existingUser?.followers.filter(
              (followingUser) => followingUser?.id !== currentUserId
            ),
          },
        });
      }
    },
  });

  const followOrUnfollow = useCallback(() => {
    isFollowing ? unfollowUser() : followUser();
  }, [followUser, unfollowUser, isFollowing]);

  return (
    <Button
      className="FollowButton"
      onPress={currentUserId ? followOrUnfollow : openLoginModal}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
