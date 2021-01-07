import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from './Button';
import { CommentFragment as CommentFragmentType } from '../fragments/__generated__/CommentFragment';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import { CreateComment as CreateCommentResponse } from '../mutations/__generated__/CreateComment';
import PostFragment from '../fragments/PostFragment';
import { PostFragment as PostFragmentType } from '../fragments/__generated__/PostFragment';
import CreateComment from '../mutations/CreateComment';

import './CommentForm.css';
import Avatar from './Avatar';
import { useCurrentUser } from '../queries/GetUser';

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

  const [createComment] = useMutation<CreateCommentResponse>(CreateComment, {
    variables: commentInput,

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

  return (
    <div>
      <div>
        <Avatar {...currentUser} height={30} width={30} />
        {comment && onCancel && <Button onPress={onCancel}>Cancel</Button>}
      </div>
      <textarea
        name="text"
        value={commentInput?.text || ''}
        onChange={onChange}
        className="CommentForm__text_area"
      />
      <Button
        className="CommentForm__submit_button"
        onPress={onSubmitEditOrCreate}
      >
        {comment ? 'Update' : 'Create'}
      </Button>
    </div>
  );
}
