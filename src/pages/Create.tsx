import React, { useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { decode } from 'querystring';

import usePageTitle from '../hooks/usePageTitle';
import Button from '../components/Button';
import ImageUploader from '../components/ImageUploader';
import Title from '../components/Title';

import './Create.css';

type Props = RouteComponentProps;

export default function Create(props: Props) {
  const { projectId } = decode(props.location.search?.substr(1));

  const [projectExecution, setProjectExecution] = useState({ projectId });

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target && target.name) {
      setProjectExecution({
        ...projectExecution,
        [target.name]: target.value,
      })
    }
  }, [projectExecution]);

  const onSubmit = useCallback(() => {
    console.log(projectExecution);
  }, [projectExecution]);
  
  usePageTitle('Start Your Own Attempt');

  return (
    <form>
      <Title>Start Your Own Attempt</Title>

      <div className="Create__hero">
        <ImageUploader height={500} width={500} />
      </div>

      {/* {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`} */}
      <input name="name" type="text" onChange={onChange} />

      <p>
        <Button onPress={onSubmit}>Submit</Button>
      </p>
    </form>
  );
}
