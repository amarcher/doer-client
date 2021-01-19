import React from 'react';
import { PostFragment as PostFragmentType } from '../fragments/__generated__/PostFragment';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import { getImagesForCarousel } from '../utils/images';
import ClapButton from '../components/ClapButton';
import Carousel from '../components/Carousel';
import Comments from '../components/Comments';
import { timeAgo } from '../utils/dateTime';

import './Post.css';

export default function Post(post: Partial<PostFragmentType>) {
  const currentUserId = useCurrentUserId();
  const { createdAt, comments, id, text, images, userId } = post;

  return (
    <div className="Post">
      <div className="Post__created_at">Posted {timeAgo(createdAt)}</div>
      <div className="Post__hero">
        {images && (
          <>
            <Carousel
              images={getImagesForCarousel(images)}
              height={300}
              width={300}
            />
            <div>{text}</div>
          </>
        )}
      </div>
      {currentUserId !== userId && <ClapButton post={post} />}
      {<Comments comments={comments} postId={id} />}
    </div>
  );
}
