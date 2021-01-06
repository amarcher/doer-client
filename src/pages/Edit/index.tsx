import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import PostForm from '../../components/PostForm';
import UpdateProjectExecution from '../../mutations/UpdateProjectExecution';
import { UpdateProjectExecution as UpdateProjectExecutionResult } from '../../mutations/__generated__/UpdateProjectExecution';
import GetProjectExecution from '../../queries/GetProjectExecution';
import { GetProjectExecution as GetProjectExecutionResponse } from '../../queries/__generated__/GetProjectExecution';

import './Edit.css';

type Props = RouteComponentProps;

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

      {data?.projectExecution?.posts.map((post) => {
        return (
          post && (
            <div className="Edit__hero" key={post.id}>
              <PostForm
                post={post}
                projectExecutionId={data?.projectExecution?.id}
              />
            </div>
          )
        );
      })}

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <p>
        <Button onPress={updateProjectExecution}>Save</Button>
      </p>
    </form>
  );
}
