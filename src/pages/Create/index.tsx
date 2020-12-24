import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';
import CreateProjectExecution, { CreateProjectExecutionResult } from '../../mutations/CreateProjectExecution';
import GetProject, { GetProjectResponse } from '../../queries/GetProject';

import './Create.css';

type Props = RouteComponentProps;
interface ProjecteExecutionInput {
  projectId: number
  title: string
  startedAt: number,
}
interface ImageUploadInput {
  hostedUrl: string
  caption?: string
  timeTaken: number,
}

export default function Create({ history, location: { search} }: Props) {
  const { projectId: projectIdStr } = decode(search?.substr(1));
  const projectId = parseInt(projectIdStr as string, 10);

  const [projectExecutionInput, setProjectExecutionInput] = useState({ projectId, title: '', startedAt: Date.now() } as ProjecteExecutionInput);
  const [imageUploadInputs, setImageUploadInputs] = useState([] as ImageUploadInput[]);

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target && target.name) {
      setProjectExecutionInput({
        ...projectExecutionInput,
        [target.name]: target.value,
      });
    }
  }, [projectExecutionInput]);

  const [createProjectExecution, { error, loading }] = useMutation<CreateProjectExecutionResult>(
    CreateProjectExecution,
    {
      variables: {
        projectExecutionInput: {
          ...projectExecutionInput,
          userId: 1,
          startedAt: Date.now(),
        },
        imageUploadInputs,
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
                ...existingProject.project,
                projectExecutions: [
                  ...existingProject.project.projectExecutions,
                  newProjectExecution,
                ],
              },
            },
          });
        }
      },

      onCompleted: () => {
        history.push(`/project/${projectId}`);
      },
    },
  );

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProjectExecution();
  }, [createProjectExecution])

  const onPhotoUploaded = useCallback(({ publicId: caption, url: hostedUrl }: { publicId: string, url: string }) => {
    setImageUploadInputs([
      ...imageUploadInputs,
      {
        caption,
        hostedUrl,
        timeTaken: Date.now(),
      },
    ]);
  }, [setImageUploadInputs, imageUploadInputs]);

  const onPhotoRemoved = useCallback((removedPublicId) => {
    const activeIndex = imageUploadInputs.findIndex(({ caption }) => caption === removedPublicId);
    if (activeIndex >= 0) {
      setImageUploadInputs([
        ...imageUploadInputs.slice(0, activeIndex),
        ...imageUploadInputs.slice(activeIndex),
      ]);
    }
  }, [setImageUploadInputs, imageUploadInputs]);
  
  usePageTitle('Start Your Own Attempt');

  return (
    <form onSubmit={onSubmit}>
      <Title>Start Your Own Attempt</Title>

      <div className="Create__hero">
        <ImageUploader onPhotoUploaded={onPhotoUploaded} onPhotoRemoved={onPhotoRemoved} height={500} width={500} />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <label className="Create__label">
        Title:{' '}
        <input name="title" type="text" onChange={onChange} value={projectExecutionInput.title} placeholder="My Project Execution" required />
      </label>

      <p>
        <Button onPress={createProjectExecution}>Create</Button>
      </p>
    </form>
  );
}
