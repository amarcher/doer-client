import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import Title from '../../components/Title';
import GetCategory from '../../queries/GetCategory';
import Logo from '../../components/Logo2';
import { GetCategory as GetCategoryResponse } from '../../queries/__generated__/GetCategory';
import Loading from '../../components/Loading';

import './Category.css';
import ProjectForm from '../../components/ProjectForm';

type Props = RouteComponentProps<{ categoryId: string }>;

export default function Category({
  match: {
    params: { categoryId },
  },
}: Props) {
  const { data, loading, error } = useQuery<GetCategoryResponse>(GetCategory, {
    variables: {
      id: categoryId,
    },
  });

  usePageTitle(data?.category?.name);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>ERROR: {error?.message}</div>;
  }

  return (
    <>
      <Title>{data?.category?.name}</Title>

      <div className="Category__hero">
        <Logo />
      </div>

      {data?.category?.projects?.map((category) => {
        const { id, name } = category || {};
        return (
          <p key={id}>
            <Button href={`/project/${id}`}>{name}</Button>
          </p>
        );
      })}

      <ProjectForm categoryId={categoryId} />
    </>
  );
}
