import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import UpdateProjectExecution from '../../mutations/UpdateProjectExecution';
import { UpdateProjectExecution as UpdateProjectExecutionResult } from '../../mutations/__generated__/UpdateProjectExecution';
import GetProjectExecution from '../../queries/GetProjectExecution';
import { getImageUploadInputsFromImages } from '../../utils/images';
import {
  GetProjectExecution as GetProjectExecutionResponse,
  GetProjectExecution_projectExecution_images,
} from '../../queries/__generated__/GetProjectExecution';
import { ImageUploadInput } from '../../../__generated__/globalTypes';

import './Edit.css';

type Props = RouteComponentProps;

function getImageUploadInputOrderFromImages(
  images?: (GetProjectExecution_projectExecution_images | null)[]
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

export default function Edit({ location: { search } }: Props) {
  const { projectExecutionId } = decode(search?.substr(1));

  const { data } = useQuery<GetProjectExecutionResponse>(GetProjectExecution, {
    variables: {
      id: projectExecutionId,
    },
  });

  const [
    updateProjectExecutionInput,
    setUpdateProjectExecutionInput,
  ] = useState({
    id: data?.projectExecution?.id,
    title: data?.projectExecution?.title,
    completedAt: data?.projectExecution?.completedAt,
  });
  useEffect(() => {
    setUpdateProjectExecutionInput({
      id: data?.projectExecution?.id,
      title: data?.projectExecution?.title,
      completedAt: data?.projectExecution?.completedAt,
    });
  }, [data?.projectExecution]);

  const [imageUploadInputs, setImageUploadInputs] = useState(
    getImageUploadInputsFromImages(data?.projectExecution?.images)
  );
  useEffect(() => {
    setImageUploadInputs(
      getImageUploadInputsFromImages(data?.projectExecution?.images)
    );
  }, [data?.projectExecution?.images]);

  const [imageUploadInputOrder, setImageUploadInputOrder] = useState(
    getImageUploadInputOrderFromImages(data?.projectExecution?.images)
  );
  useEffect(() => {
    setImageUploadInputOrder(
      getImageUploadInputOrderFromImages(data?.projectExecution?.images)
    );
  }, [data?.projectExecution?.images]);

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target && target.name) {
        setUpdateProjectExecutionInput((prevProjectExecutionInput) => ({
          ...prevProjectExecutionInput,
          [target.name]: target.value,
        }));
      }
    },
    []
  );

  const [
    updateProjectExecution,
    { error, loading },
  ] = useMutation<UpdateProjectExecutionResult>(UpdateProjectExecution, {
    variables: {
      ...updateProjectExecutionInput,
    },
  });

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateProjectExecution();
    },
    [updateProjectExecution]
  );

  const onPhotoUploaded = useCallback(
    ({ publicId, hostedUrl, caption }: Partial<ImageUploadInput>) => {
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
        },
      }));
    },
    []
  );

  const getImageOrder = useCallback(
    (publicId: string) => {
      return imageUploadInputOrder[publicId] || 0;
    },
    [imageUploadInputOrder]
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

  usePageTitle(data?.projectExecution?.title || '');

  return (
    <form onSubmit={onSubmit}>
      <input
        name="title"
        type="text"
        onChange={onChange}
        value={updateProjectExecutionInput.title || ''}
        placeholder="My Project Execution"
        required
      />

      <div className="Edit__hero">
        <ImageUploader
          onPhotoUploaded={onPhotoUploaded}
          onPhotoRemoved={onPhotoRemoved}
          height={100}
          width={100}
          withCaption
          images={imageUploadInputs}
          getImageOrder={getImageOrder}
          tags={
            data?.projectExecution?.project?.name
              ? [data?.projectExecution?.project?.name]
              : undefined
          }
        />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <p>
        <Button onPress={updateProjectExecution}>Save</Button>
      </p>
    </form>
  );
}
