import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Button from './Button';
import ImageUploader from './ImageUploader';
import { ImageUploadInput } from '../../__generated__/globalTypes';
import { getImageUploadInputsFromImages } from '../utils/images';
import './PostForm.css';
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

  const [createPost] = useMutation<CreatePostResponse>(CreatePost, {
    variables: {
      ...postInput,
      imageUploadInputs: Object.values(imageUploadInputs).sort(
        (a, b) => getImageOrder(b.publicId) - getImageOrder(a.publicId)
      ),
    },

    update(cache, { data }) {
      const newPost = data?.createPost;
      const fragmentName = 'ProjectExecutionFragment';
      const currentProjectExecution = cache.readFragment<ProjectExecutionFragmentType>(
        {
          id: `ProjectExecution:${projectExecutionId}`,
          fragment: ProjectExecutionFragment,
          fragmentName,
        }
      );

      if (newPost && currentProjectExecution) {
        cache.writeFragment({
          id: `ProjectExecution:${projectExecutionId}`,
          fragment: ProjectExecutionFragment,
          data: {
            ...currentProjectExecution,
            posts: [...(currentProjectExecution.posts || []), newPost],
          },
          fragmentName,
        });
      }
    },

    onCompleted: () => {
      resetForm();
      history.push(`/attempt/${projectExecutionId}`);
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
    <div>
      <div className="Create__hero">
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

      <label className="Create__label">
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
