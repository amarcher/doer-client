import React from 'react';
import { CommentFragment as CommentFragmentType } from '../fragments/__generated__/CommentFragment';
import useBooleanState from '../hooks/useBooleanState';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import Button from './Button';
import { timeAgo } from '../utils/dateTime';

import './Comment.css';

export default function Comment(comment: Partial<CommentFragmentType>) {
  const { createdAt, postId, text, user } = comment;
  const currentUserId = useCurrentUserId();
  const {
    state: isEditing,
    setTrue: startEditing,
    setFalse: stopEditing,
  } = useBooleanState(false);

  return (
    <div className="Comment">
      {isEditing ? (
        <CommentForm
          postId={postId}
          comment={comment}
          onSubmit={stopEditing}
          onCancel={stopEditing}
        />
      ) : (
        <div className="Comment__container">
          <Button href={`/profile/${user?.id}`} className="Comment__label">
            <Avatar {...user} height={30} width={30} />
          </Button>
          <div className="Comment__content">
            <div className="Comment__header">
              <div className="Comment__username_and_date">
                <Button
                  className="Comment__username"
                  href={`/profile/${user?.id}`}
                >
                  {user?.firstName} {user?.lastName}
                </Button>
                <div className="Comment__createdAt">{timeAgo(createdAt)}</div>
              </div>
              {user?.id === currentUserId && (
                <Button onPress={startEditing} className="Comment__edit_link">
                  Edit
                </Button>
              )}
            </div>
            <div className="Comment__text">{text}</div>
          </div>
        </div>
      )}
    </div>
  );
}
