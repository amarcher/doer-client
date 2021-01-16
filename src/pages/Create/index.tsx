import React, { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';
import CreateProjectExecution from '../../mutations/CreateProjectExecution';
import { CreateProjectExecution as CreateProjectExecutionResult } from '../../mutations/__generated__/CreateProjectExecution';
import GetProject from '../../queries/GetProject';
import {
  GetProject as GetProjectResponse,
  GetProject_project,
} from '../../queries/__generated__/GetProject';
import {
  ImageUploadInput,
  CreateProjectExecutionInput,
} from '../../../__generated__/globalTypes';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';

import './Create.css';

type Props = RouteComponentProps;

export default function Create({ history, location: { search } }: Props) {
  const { projectId } = decode(search?.substr(1));
  const currentUserId = useCurrentUserId();

  const { data } = useQuery<GetProjectResponse>(GetProject, {
    variables: {
      id: projectId,
    },
  });

  const [projectExecutionInput, setProjectExecutionInput] = useState({
    userId: currentUserId,
    projectId,
    title: '',
    startedAt: Date.now(),
  } as CreateProjectExecutionInput);
  const [imageUploadInputs, setImageUploadInputs] = useState(
    {} as { [publicId: string]: ImageUploadInput }
  );

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target && target.name) {
        setProjectExecutionInput((prevProjectExecutionInput) => ({
          ...prevProjectExecutionInput,
          [target.name]: target.value,
        }));
      }
    },
    []
  );

  const [imageUploadInputOrder, setImageUploadInputOrder] = useState(
    {} as { [id: string]: number }
  );

  const getImageOrder = useCallback(
    (publicId?: string | null) => {
      return publicId ? imageUploadInputOrder[publicId] : 0;
    },
    [imageUploadInputOrder]
  );

  const [createProjectExecution] = useMutation<CreateProjectExecutionResult>(
    CreateProjectExecution,
    {
      variables: {
        projectExecutionInput: {
          ...projectExecutionInput,
          userId: currentUserId,
          startedAt: Date.now(),
        },
        imageUploadInputs: Object.values(imageUploadInputs).sort(
          (a, b) => getImageOrder(a.publicId) - getImageOrder(b.publicId)
        ),
      },

      update: (cache, { data }) => {
        const newProjectExecution = data?.createProjectExecution;
        const existingProject = cache.readQuery<GetProjectResponse>({
          query: GetProject,
          variables: { id: projectId },
        });

        if (existingProject && newProjectExecution) {
          cache.writeQuery<GetProjectResponse>({
            query: GetProject,
            data: {
              project: {
                ...existingProject?.project,
                projectExecutions: [
                  ...(existingProject?.project?.projectExecutions || []),
                  newProjectExecution,
                ],
              } as GetProject_project,
            },
          });
        }
      },

      onCompleted: () => {
        history.push(`/project/${projectId}`);
      },
    }
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createProjectExecution();
    },
    [createProjectExecution]
  );

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
          [publicId]: Object.keys(prevImageUploadInputOrder).length + 1,
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

    setImageUploadInputOrder((prevImageUploadInputOrder) => {
      if (prevImageUploadInputOrder[removedPublicId] == null) {
        return prevImageUploadInputOrder;
      }

      const {
        [removedPublicId]: omittedImageUploadInputOrder,
        ...remainingImageUploadInputOrder
      } = prevImageUploadInputOrder;

      return Object.keys(remainingImageUploadInputOrder).reduce(
        (memo, publicId) => {
          const prevOrder = remainingImageUploadInputOrder[publicId];
          memo[publicId] =
            prevOrder > omittedImageUploadInputOrder
              ? prevOrder - 1
              : prevOrder;
          return memo;
        },
        {} as { [id: string]: number }
      );
    });
  }, []);

  usePageTitle('Start Your Own Attempt');

  return (
    <form onSubmit={onSubmit}>
      <Title>Start Your Own Attempt</Title>

      <div className="Create__hero">
        <ImageUploader
          onPhotoUploaded={onPhotoUploaded}
          onPhotoRemoved={onPhotoRemoved}
          height={100}
          width={100}
          withCaption
          getImageOrder={getImageOrder}
          images={imageUploadInputs}
          tags={data?.project?.name ? [data.project.name] : undefined}
        />
      </div>

      <label className="Create__label">
        Title:{' '}
        <input
          name="title"
          type="text"
          onChange={onChange}
          value={projectExecutionInput?.title || ''}
          placeholder="My Project Execution"
          required
        />
      </label>

      <p>
        <Button onPress={createProjectExecution}>Create</Button>
      </p>
    </form>
  );
}
