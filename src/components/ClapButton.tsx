import React, { useMemo } from 'react';
import { useMutation } from '@apollo/client';
import GetPost from '../queries/GetPost';
import { PostFragment } from '../fragments/__generated__/PostFragment';
import Clap from '../mutations/Clap';
import { Clap as ClapResponse } from '../mutations/__generated__/Clap';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Button from './Button';

import './ClapButton.css';

type Props = {
  post?: PostFragment | null;
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

    refetchQueries: [{ query: GetPost, variables: { postId: post?.id } }],
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
