import React from 'react';
import { useQuery } from '@apollo/client';

import Post from './Post';
import Button from './Button';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import GetPostsForUser from '../queries/GetPostsForUser';
import { GetPostsForUser as GetPostsForUserResponse } from '../queries/__generated__/GetPostsForUser';

import './PostsForUser.css';

export default function PostsForUser() {
  const currentUserId = useCurrentUserId();

  const { data, loading } = useQuery<GetPostsForUserResponse>(GetPostsForUser, {
    variables: {
      userId: currentUserId,
    },

    skip: !currentUserId,
  });

  if (!currentUserId || loading || !data?.postsForUser?.length) {
    return null;
  }

  return (
    <div className="PostsForUser">
      {data?.postsForUser?.map((post) => (
        <div className="PostsForUser__post">
          <div className="PostsForUser__project_title">
            "
            <Button href={`/attempt/${post?.projectExecutionId}`}>
              {post?.projectExecution?.title}
            </Button>
            " by{' '}
            <Button href={`/profile/${post?.userId}/view`}>
              {post?.user?.firstName}
            </Button>
          </div>
          <Post key={post?.id} {...post} />
        </div>
      ))}
    </div>
  );
}
