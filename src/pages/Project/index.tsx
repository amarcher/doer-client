import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Carousel from '../../components/Carousel';
import GetProject from '../../queries/GetProject';
import { GetProject as GetProjectResponse } from '../../queries/__generated__/GetProject';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import { getImagesForCarousel } from '../../utils/images';

import './Project.css';

type Props = RouteComponentProps<{ projectId: string }>;

export default function Project({
  match: {
    params: { projectId },
  },
}: Props) {
  const { data, loading, error } = useQuery<GetProjectResponse>(GetProject, {
    variables: {
      id: projectId,
    },
  });

  usePageTitle(data?.project?.name);

  const currentUserId = useCurrentUserId();
  const projectExecutions = data?.project?.projectExecutions;

  return (
    <>
      <Title>{data?.project?.name}</Title>

      {projectExecutions?.map((projectExecution) => {
        const { id, title, images, user } = projectExecution || {};
        return (
          <div className="Project__link">
            <div className="Project__execution" key={id}>
              <div className="Project__title">
                "<Button href={`/attempt/${id}`}>{title}</Button>" by{' '}
                <Button href={`/profile/${user?.id}/view`} preventDefault>
                  {user?.firstName}
                </Button>
                {user?.id === currentUserId && (
                  <div className="Project__edit_link">
                    (
                    <Button
                      href={`/edit?projectExecutionId=${id}`}
                      preventDefault
                    >
                      Edit
                    </Button>
                    )
                  </div>
                )}
              </div>
              {images && <Carousel images={getImagesForCarousel(images)} />}
            </div>
          </div>
        );
      })}

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
