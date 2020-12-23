import React, { useState, useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import ImageUploader from '../../components/ImageUploader';
import Title from '../../components/Title';

import './Create.css';

export const CREATE_PROJECT_EXECUTION = gql`
  mutation CreateProjectExecution($projectExecutionInput: CreateProjectExecutionInput!) {
    createProjectExecution(projectExecutionInput: $projectExecutionInput) {
      title
      id
    }
  }
`;

type Props = RouteComponentProps;

export default function Create({ history, location: { search} }: Props) {
  const { projectId } = decode(search?.substr(1));

  const [projectExecutionInput, setProjectExecutionInput] = useState({ projectId, title: '', startedAt: Date.now() });

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target && target.name) {
      setProjectExecutionInput({
        ...projectExecutionInput,
        [target.name]: target.value,
      })
    }
  }, [projectExecutionInput]);

  const [createProjectExecution, { /* data, */ error, loading }] = useMutation<any>(
    CREATE_PROJECT_EXECUTION, {
      variables: {
        projectExecutionInput: {
          ...projectExecutionInput,
          userId: 1,
          startedAt: Date.now(),
        },
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
