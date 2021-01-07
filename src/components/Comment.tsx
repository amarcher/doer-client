import React from 'react';
import { CommentFragment as CommentFragmentType } from '../fragments/__generated__/CommentFragment';
import useBooleanState from '../hooks/useBooleanState';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import Button from './Button';

import './Comment.css';

export default function Comments(comment: Partial<CommentFragmentType>) {
  const { createdAt, postId, text, user } = comment;
  const currentUserId = useCurrentUserId();
  const {
    state: isEditing,
    setTrue: startEditing,
    setFalse: stopEditing,
  } = useBooleanState(false);

  return (
    <div className="Comment">
      {isEditing && (
        <CommentForm
          postId={postId}
          comment={comment}
          onSubmit={stopEditing}
          onCancel={stopEditing}
        />
      )}
      <div>
        <Avatar {...user} height={30} width={30} />
        <div className="Comment__createdAt">{createdAt}</div>
        {user?.id === currentUserId && (
          <Button onPress={startEditing}>Edit</Button>
        )}
      </div>
      <div className="Comment__text">{text}</div>
    </div>
  );
}
