import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import Button from './Button';
import { CommentFragment as CommentFragmentType } from '../fragments/__generated__/CommentFragment';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import { CreateComment as CreateCommentResponse } from '../mutations/__generated__/CreateComment';
import PostFragment from '../fragments/PostFragment';
import { PostFragment as PostFragmentType } from '../fragments/__generated__/PostFragment';
import CreateComment from '../mutations/CreateComment';
import Avatar from './Avatar';
import { useCurrentUser } from '../queries/GetUser';
import { UserWithFollowsFragment } from '../fragments/__generated__/UserWithFollowsFragment';
import { timeAgo } from '../utils/dateTime';

import './CommentForm.css';

interface Props {
  postId?: string;
  comment?: Partial<CommentFragmentType>;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export default function ProjectForm({
  postId,
  comment,
  onSubmit,
  onCancel,
}: Props) {
  const currentUserId = useCurrentUserId();
  const currentUser = useCurrentUser();
  const inputEl = useRef<HTMLInputElement | null>(null);

  const [commentInput, setCommentInput] = useState({
    text: comment?.text || '',
    postId,
    userId: currentUserId,
  });

  useEffect(() => {
    setCommentInput({
      text: comment?.text || '',
      postId,
      userId: currentUserId,
    });
  }, [comment?.text, postId, currentUserId]);

  useEffect(() => {
    if (comment) {
      setTimeout(() => inputEl?.current?.focus(), 0);
    }
  }, [comment]);

  const [createComment] = useMutation<CreateCommentResponse>(CreateComment, {
    variables: commentInput,

    optimisticResponse: {
      createComment: {
        __typename: 'Comment',
        id: 'placeholder',
        createdAt: moment().format(),
        text: commentInput.text,
        postId: postId || '',
        userId: currentUserId || '',
        user: currentUser || ({} as UserWithFollowsFragment),
      },
    },

    update(cache, { data }) {
      if (data?.createComment) {
        const fragmentOptions = {
          fragment: PostFragment,
          fragmentName: 'PostFragment',
          id: `Post:${postId}`,
        };

        const existingPost = cache.readFragment<PostFragmentType>(
          fragmentOptions
        );

        if (existingPost) {
          cache.writeFragment<PostFragmentType>({
            ...fragmentOptions,
            data: {
              ...existingPost,
              comments: [
                ...(existingPost?.comments || []),
                data?.createComment,
              ],
            },
          });
        }
      }
    },
  });

  // TODO: Add support for updateComment once mutation is supported

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setCommentInput((prevCommentInput) => ({
        ...prevCommentInput,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const onSubmitEditOrCreate = useCallback(() => {
    if (!comment) {
      createComment();
    } else {
      /* updateComment */
    }

    setCommentInput({ userId: currentUserId, postId, text: '' });
    if (onSubmit) onSubmit();
  }, [createComment, postId, comment, currentUserId, onSubmit]);

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.altKey) {
        onSubmitEditOrCreate();
      }
    },
    [onSubmitEditOrCreate]
  );

  return (
    <div className="CommentForm__container">
      <div className="CommentForm__label">
        <Avatar {...currentUser} height={30} width={30} />
      </div>
      <div className="CommentForm__content">
        <div className="CommentForm__header">
          <div className="CommentForm__username_and_date">
            <Button className="CommentForm__username">
              {currentUser?.firstName} {currentUser?.lastName}
            </Button>
          </div>
          {comment && onCancel && (
            <>
              <div className="Comment__createdAt">
                {timeAgo(comment.createdAt)}
              </div>
              <Button onPress={onCancel} className="CommentForm__cancel_link">
                Cancel
              </Button>
            </>
          )}
          <Button
            className="CommentForm__submit_button"
            onPress={onSubmitEditOrCreate}
          >
            {comment ? 'Update' : 'Create'}
          </Button>
        </div>
        <div className="CommentForm__text">
          <input
            ref={inputEl}
            name="text"
            value={commentInput?.text || ''}
            onKeyUp={onKeyUp}
            onChange={onChange}
            className="CommentForm__input"
            placeholder="Write a comment"
          />
        </div>
      </div>
    </div>
  );
}
