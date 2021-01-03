import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Carousel from '../../components/Carousel';
import GetProjectExecution from '../../queries/GetProjectExecution';
import { GetProjectExecution as GetProjectExecutionResponse } from '../../queries/__generated__/GetProjectExecution';
import { getImagesForCarousel } from '../../utils/images';

import './Attempt.css';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';

type Props = RouteComponentProps<{ projectExecutionId: string }>;

export default function Attempt({
  match: {
    params: { projectExecutionId },
  },
}: Props) {
  const currentUserId = useCurrentUserId();
  const { data, loading, error } = useQuery<GetProjectExecutionResponse>(
    GetProjectExecution,
    {
      variables: {
        id: projectExecutionId,
      },
    }
  );

  usePageTitle(data?.projectExecution?.title || '');

  return (
    <>
      <Title>{data?.projectExecution?.title || ''}</Title>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}

      <div>
        by{' '}
        <Button href={`/profile/${data?.projectExecution?.user?.id}/view`}>
          {data?.projectExecution?.user?.firstName}
        </Button>
        {data?.projectExecution?.user?.id === currentUserId && (
          <div className="Project__edit_link">
            (
            <Button
              href={`/edit?projectExecutionId=${projectExecutionId}`}
              preventDefault
            >
              Edit
            </Button>
            )
          </div>
        )}
      </div>

      <div className="Attempt__hero">
        {data?.projectExecution?.images && (
          <Carousel
            images={getImagesForCarousel(data?.projectExecution?.images)}
            height={300}
            width={300}
          />
        )}
      </div>
    </>
  );
}
