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

export default function Create({ history, location: { search} }: Props) {
  const { projectId: projectIdStr } = decode(search?.substr(1));
  const projectId = parseInt(projectIdStr as string, 10);

  const [projectExecutionInput, setProjectExecutionInput] = useState({ projectId, title: '', startedAt: Date.now() });

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target && target.name) {
      setProjectExecutionInput({
        ...projectExecutionInput,
        [target.name]: target.value,
      })
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
  
  usePageTitle('Start Your Own Attempt');

  return (
    <form onSubmit={onSubmit}>
      <Title>Start Your Own Attempt</Title>

      <div className="Create__hero">
        <ImageUploader height={500} width={500} />
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
