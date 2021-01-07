import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Carousel from '../../components/Carousel';
import Comments from '../../components/Comments';
import GetProjectExecution from '../../queries/GetProjectExecution';
import { GetProjectExecution as GetProjectExecutionResponse } from '../../queries/__generated__/GetProjectExecution';
import { getImagesForCarousel } from '../../utils/images';
import { useCurrentUserId } from '../../queries/GetCurrentUserId';
import ClapButton from '../../components/ClapButton';
import PostForm from '../../components/PostForm';

import './Attempt.css';
import Loading from '../../components/Loading';

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>ERROR: {error?.message}</div>;
  }

  return (
    <>
      <Title>{data?.projectExecution?.title || ''}</Title>

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

      {data?.projectExecution?.posts?.map((post) => (
        <div key={post?.id} className="Attempt__post">
          <div className="Attempt__hero">
            {post && (
              <>
                <Carousel
                  images={getImagesForCarousel(post.images)}
                  height={300}
                  width={300}
                />
                <div>{post.text}</div>
              </>
            )}
          </div>
          {currentUserId !== data?.projectExecution?.user?.id && (
            <ClapButton post={post} />
          )}
          {<Comments comments={post?.comments} postId={post?.id} />}
        </div>
      ))}
      {currentUserId === data?.projectExecution?.user?.id && (
        <PostForm
          projectExecutionId={data?.projectExecution?.id}
          tags={
            data?.projectExecution?.project?.name
              ? [data.projectExecution.project.name]
              : undefined
          }
        />
      )}
    </>
  );
}
