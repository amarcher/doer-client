import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useMutation } from '@apollo/client';

import Button from './Button';
import ImageUploader from './ImageUploader';
import { ImageUploadInput } from '../../__generated__/globalTypes';
import { getImageUploadInputsFromImages } from '../utils/images';
import { useCurrentUserId } from '../queries/GetCurrentUserId';
import { PostFragment as PostFragmentType } from '../fragments/__generated__/PostFragment';
import GetProjectExecution from '../queries/GetProjectExecution';
import { CreatePost as CreatePostResponse } from '../mutations/__generated__/CreatePost';
import CreatePost from '../mutations/CreatePost';
import { useHistory } from 'react-router-dom';
import { GetProjectExecution_projectExecution_posts_images } from '../queries/__generated__/GetProjectExecution';
import { UpdatePost as UpdatePostResponse } from '../mutations/__generated__/UpdatePost';
import UpdatePost from '../mutations/UpdatePost';
import ProjectExecutionFragment from '../fragments/ProjectExecutionFragment';
import { ProjectExecutionFragment as ProjectExecutionFragmentType } from '../fragments/__generated__/ProjectExecutionFragment';
import DeletePost from '../mutations/DeletePost';
import { DeletePost as DeletePostResponse } from '../mutations/__generated__/DeletePost';
import useBooleanState from '../hooks/useBooleanState';

import './PostForm.css';

interface Props {
  projectExecutionId?: string;
  post?: PostFragmentType | null;
  tags?: string[];
}

function getImageUploadInputOrderFromImages(
  images?: (GetProjectExecution_projectExecution_posts_images | null)[]
) {
  if (!images) {
    return {};
  }

  return images.reduce((imageUploadInputOrder, image) => {
    if (image) {
      imageUploadInputOrder[image.image.id] = image.order || 0;
    }
    return imageUploadInputOrder;
  }, {} as { [id: string]: number });
}

export default function PostForm({ projectExecutionId, post, tags }: Props) {
  const currentUserId = useCurrentUserId();
  const history = useHistory();

  const [postInput, setPostInput] = useState({
    text: post?.text || '',
    userId: currentUserId,
    projectExecutionId,
  });
  const {
    state: showConfirmDeletePost,
    setTrue: setShowConfirmDeletePostTrue,
    setFalse: setShowConfirmDeletePostFalse,
  } = useBooleanState(false);

  useEffect(() => {
    setPostInput({
      text: post?.text || '',
      userId: currentUserId,
      projectExecutionId,
    });
  }, [post?.text, currentUserId, projectExecutionId]);

  const [imageUploadInputs, setImageUploadInputs] = useState(
    getImageUploadInputsFromImages(post?.images)
  );
  useEffect(() => {
    setImageUploadInputs(getImageUploadInputsFromImages(post?.images));
  }, [post?.images]);

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target && target.name) {
        setPostInput((prevPostInput) => ({
          ...prevPostInput,
          [target.name]: target.value,
        }));
      }
    },
    []
  );

  const [imageUploadInputOrder, setImageUploadInputOrder] = useState(
    getImageUploadInputOrderFromImages(post?.images)
  );
  useEffect(() => {
    setImageUploadInputOrder(getImageUploadInputOrderFromImages(post?.images));
  }, [post?.images]);

  const getImageOrder = useCallback(
    (publicId?: string | null) => {
      return publicId ? imageUploadInputOrder[publicId] : 0;
    },
    [imageUploadInputOrder]
  );

  const resetForm = useCallback(() => {
    setImageUploadInputOrder({});
    setImageUploadInputs({});
    setPostInput({
      text: '',
      userId: currentUserId,
      projectExecutionId,
    });
  }, [currentUserId, projectExecutionId]);

  const projectExecutionFragmentForUpdate = useMemo(
    () => ({
      id: `ProjectExecution:${projectExecutionId}`,
      fragment: ProjectExecutionFragment,
      fragmentName: 'ProjectExecutionFragment',
    }),
    [projectExecutionId]
  );

  const [createPost] = useMutation<CreatePostResponse>(CreatePost, {
    variables: {
      ...postInput,
      imageUploadInputs: Object.values(imageUploadInputs).sort(
        (a, b) => getImageOrder(b.publicId) - getImageOrder(a.publicId)
      ),
    },

    update(cache, { data }) {
      const newPost = data?.createPost;
      const existingProjectExecution = cache.readFragment<ProjectExecutionFragmentType>(
        projectExecutionFragmentForUpdate
      );

      if (newPost && existingProjectExecution) {
        cache.writeFragment({
          ...projectExecutionFragmentForUpdate,
          data: {
            ...existingProjectExecution,
            posts: [...(existingProjectExecution.posts || []), newPost],
          },
        });
      }
    },

    onCompleted: () => {
      resetForm();
      history.push(`/attempt/${projectExecutionId}`);
    },
  });

  const [deletePost] = useMutation<DeletePostResponse>(DeletePost, {
    variables: {
      postId: post?.id,
    },

    optimisticResponse: {
      deletePost: true,
    },

    update(cache, { data }) {
      const existingProjectExecution = cache.readFragment<ProjectExecutionFragmentType>(
        projectExecutionFragmentForUpdate
      );

      if (existingProjectExecution) {
        cache.writeFragment({
          ...projectExecutionFragmentForUpdate,
          data: {
            ...existingProjectExecution,
            posts: existingProjectExecution.posts.filter(
              (existingPost) => existingPost?.id !== post?.id
            ),
          },
        });
      }
    },
  });

  const [updatePost] = useMutation<UpdatePostResponse>(UpdatePost, {
    variables: {
      postId: post?.id,
      text: postInput.text,
      imageUploadInputs: Object.values(imageUploadInputs).sort(
        (a, b) => getImageOrder(b.publicId) - getImageOrder(a.publicId)
      ),
    },

    // TODO: Once backend returns the newly created post
    // use update() to writeFragment for that post instead of refetching
    refetchQueries: [
      {
        query: GetProjectExecution,
        variables: { id: projectExecutionId },
      },
    ],

    awaitRefetchQueries: true,

    onCompleted: () => {
      history.push(`/attempt/${projectExecutionId}`);
    },
  });

  const onPhotoUploaded = useCallback(
    ({
      publicId,
      hostedUrl,
      caption,
      imageTags,
    }: Partial<ImageUploadInput>) => {
      if (!publicId) {
        return;
      }

      setImageUploadInputs((prevImageUploadInputs) => ({
        ...prevImageUploadInputs,
        [publicId]: {
          hostedUrl:
            hostedUrl || prevImageUploadInputs[publicId]?.hostedUrl || '',
          caption,
          timeTaken: Date.now(),
          imageTags,
          publicId,
        },
      }));

      setImageUploadInputOrder((prevImageUploadInputOrder) => {
        if (prevImageUploadInputOrder[publicId] != null) {
          return prevImageUploadInputOrder;
        }

        return {
          ...prevImageUploadInputOrder,
          [publicId]: Object.keys(prevImageUploadInputOrder).length,
        };
      });
    },
    []
  );

  const onPhotoRemoved = useCallback((removedPublicId) => {
    setImageUploadInputs((prevImageUploadInputs) => {
      const {
        [removedPublicId]: _omitted,
        ...remaining
      } = prevImageUploadInputs;
      return remaining;
    });
  }, []);

  return (
    <div className="PostForm">
      {post && (
        <div className="PostForm__delete_buttons">
          {showConfirmDeletePost ? (
            <div className="PostForm__delete_confirmation_buttons">
              Delete this post?
              <Button
                onPress={setShowConfirmDeletePostFalse}
                className="PostForm__cancel_delete_button"
              >
                Cancel
              </Button>
              <Button
                onPress={deletePost}
                className="PostForm__confirm_delete_button"
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button
              onPress={setShowConfirmDeletePostTrue}
              className="PostForm__delete_button"
            >
              x
            </Button>
          )}
        </div>
      )}
      <div className="PostForm__hero">
        <ImageUploader
          onPhotoUploaded={onPhotoUploaded}
          onPhotoRemoved={onPhotoRemoved}
          height={100}
          width={100}
          withCaption
          getImageOrder={getImageOrder}
          images={imageUploadInputs}
          tags={tags}
        />
      </div>

      <label className="PostForm__label">
        Text:{' '}
        <input
          name="text"
          type="text"
          onChange={onChange}
          value={postInput?.text || ''}
          placeholder="Here's what happened"
          required
        />
      </label>

      <p>
        <Button onPress={post ? updatePost : createPost}>{`${
          post ? 'Edit' : 'Add'
        } Post`}</Button>
      </p>
    </div>
  );
}
