import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { CommentFragment as CommentFragmentType } from '../fragments/__generated__/CommentFragment';

import './Comments.css';

interface Props {
  comments?: (CommentFragmentType | null)[];
  postId?: string;
}

export default function Comments({ comments, postId }: Props) {
  return (
    <div className="Comments">
      {comments
        ?.filter((comment) => !!comment)
        .map((comment, index) => (
          <Comment {...comment} key={comment?.id || `comment_${index}`} />
        ))}
      <CommentForm postId={postId} />
    </div>
  );
}
