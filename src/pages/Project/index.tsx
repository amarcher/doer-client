import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Carousel from '../../components/Carousel';
import GetProject, {
  GetProjectResponse,
  ProjectExecutionImage,
} from '../../queries/GetProject';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';

import './Project.css';

type Props = RouteComponentProps<{ projectId: string }>;

function getImgUrl(hostedUrl?: string) {
  return hostedUrl && !hostedUrl.includes('s3:')
    ? hostedUrl
    : 'https://cataas.com/cat/gif';
}

function getImagesForCarousel(images: ProjectExecutionImage[]) {
  return images.map(({ image, caption }) => ({
    key: image.id,
    src: getImgUrl(image.hostedUrl),
    caption,
  }));
}

export default function Project({
  match: {
    params: { projectId },
  },
}: Props) {
  const { data, loading, error } = useQuery<GetProjectResponse>(GetProject, {
    variables: {
      id: parseInt(projectId, 10),
    },
  });

  usePageTitle(data?.project.name);
  const currentUserId = useCurrentUserId();
  const projectExecutions = data?.project?.projectExecutions;

  return (
    <>
      <Title>{data?.project.name}</Title>

      {projectExecutions?.map(({ id, title, images, user }) => (
        <div className="Project__execution" key={id}>
          <div className="Project__title">
            "{title}" by{' '}
            {<Button href={`/profile/${user.id}`}>{user.firstName}</Button>}
          </div>
          {images && <Carousel images={getImagesForCarousel(images)} />}
        </div>
      ))}

      {projectExecutions?.length === 0 && (
        <div className="Project__title">No projects yet</div>
      )}

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      {currentUserId && data?.project?.projectExecutions && (
        <div>
          <Button
            href={`/create?projectId=${projectId}`}
            className="Project__create_button"
          >
            Start Your Own Attempt
          </Button>
        </div>
      )}
    </>
  );
}
