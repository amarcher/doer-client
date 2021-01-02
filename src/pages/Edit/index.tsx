import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader, { Images } from '../../components/ImageUploader';
import UpdateProjectExecution from '../../mutations/UpdateProjectExecution';
import { UpdateProjectExecution as UpdateProjectExecutionResult } from '../../mutations/__generated__/UpdateProjectExecution';
import GetProjectExecution from '../../queries/GetProjectExecution';
import {
  GetProjectExecution as GetProjectExecutionResponse,
  GetProjectExecution_projectExecution_images,
} from '../../queries/__generated__/GetProjectExecution';

import './Edit.css';

type Props = RouteComponentProps;

function getImageUploadInputsFromImages(
  images?: (GetProjectExecution_projectExecution_images | null)[]
) {
  if (!images) {
    return {} as Images;
  }

  return images?.reduce((imageUploadInputs: Images, image) => {
    if (image) {
      imageUploadInputs[image.image.id] = {
        hostedUrl: image.image.hostedUrl,
        caption: image.caption,
        timeTaken: Date.now(),
      };
    }
    return imageUploadInputs;
  }, {} as Images);
}

export default function Edit({ history, location: { search } }: Props) {
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
    ({
      publicId,
      url: hostedUrl,
      caption,
    }: {
      publicId: string;
      url?: string;
      caption?: string;
    }) => {
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
          // tags={} // TODO: get tags
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
