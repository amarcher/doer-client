import React, { useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { PostFragment as PostFragmentType } from '../fragments/__generated__/PostFragment';
import Clap from '../mutations/Clap';
import { Clap as ClapResponse } from '../mutations/__generated__/Clap';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Button from './Button';

import './ClapButton.css';
import PostFragment from '../fragments/PostFragment';

type Props = {
  post?: PostFragmentType | null;
};

export default function ClapButton({ post }: Props) {
  const currentUserId = useCurrentUserId();

  const hasClapped = useMemo(
    () => post?.claps.some((clap) => clap?.userId === currentUserId),
    [post?.claps, currentUserId]
  );

  const [clap] = useMutation<ClapResponse>(Clap, {
    variables: {
      userId: currentUserId,
      postId: post?.id,
    },

    optimisticResponse: {
      clap: post?.clapCount || 0 + 1,
    },

    update(cache, { data }) {
      const newClapCount = data?.clap;
      const fragmentOptions = {
        fragment: PostFragment,
        fragmentName: 'PostFragment',
        id: `Post:${post?.id}`,
      };

      if (post && newClapCount) {
        const existingPost = cache.readFragment<PostFragmentType>(
          fragmentOptions
        );

        if (existingPost) {
          cache.writeFragment({
            ...fragmentOptions,
            data: {
              ...existingPost,
              clapCount: newClapCount,
              claps: [...existingPost.claps, { userId: currentUserId }],
            },
          });
        }
      }
    },

    onError: console.log,
  });

  return (
    <Button
      className="ClapButton"
      disabled={!post || !currentUserId}
      onPress={clap}
    >
      {hasClapped
        ? `Clap Again (${post?.clapCount})`
        : `Clap (${post?.clapCount})`}
    </Button>
  );
}