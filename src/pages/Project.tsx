import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../hooks/usePageTitle';
import Button from '../components/Button';
import Title from '../components/Title';
import Carousel from '../components/Carousel';

import './Project.css';

interface Image {
  id: number
  s3Location: string
  timeTaken: string
}

interface ProjectExecutionImage {
  id: number
  caption: string
  image: Image
}

interface User {
  firstName: string
  lastName: string
  id: number
}

interface ProjectExecution {
  title: string
  user: User
  images: ProjectExecutionImage[]
  id: number
  startedAt: string | null
  completedAt: string | null
}

interface ProjectInterface {
  id: number
  name: string
  projectExecutions: ProjectExecution[]
}

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      projectExecutions {
        id
        title
        startedAt
        completedAt
        user {
          firstName
          lastName
          id
        }
        images {
          caption
          image {
            id
            s3Location
            timeTaken
          }
        }
      }
    }
  }
`;

type Props = RouteComponentProps<{ projectId: string }>;

function getImgUrl(_s3Location?: string) {
  return 'https://cataas.com/cat/gif';
}

function getImagesForCarousel(images: ProjectExecutionImage[]) {
  return images.map(({ image, caption }) => ({
    key: image.id,
    src: getImgUrl(image.s3Location),
    caption,
  }));
}

export default function Project({ match: { params: { projectId } } }: Props) {
  const { data, loading, error } = useQuery<{ project: ProjectInterface }>(
    GET_PROJECT, {
      variables: {
        id: parseInt(projectId, 10),
      },
    }
  );
  
  usePageTitle(data?.project.name);

  return (
    <>
      <Title>{data?.project.name}</Title>

      {data?.project?.projectExecutions?.map(({ id, title, images, user }) => (
        <div className="Project__execution" key={id}>
          <div className="Project__title">
            "{title}" by {<Button href={`/profile/${user.id}`}>{user.firstName}</Button>}
          </div>
          {images && <Carousel images={getImagesForCarousel(images)} />}
        </div>
      ))}

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <div>
        <Button href={`/create?projectId=${projectId}`}>Start Your Own Attempt</Button>
      </div>
    </>
  );
}
