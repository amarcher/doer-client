import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import PreloadedImage from '../../components/PreloadedImage';
import Title from '../../components/Title';
import GetCategory from '../../queries/GetCategory';
import { GetCategory as GetCategoryResponse } from '../../queries/__generated__/GetCategory';
import logo from '../../logo2.svg';

import './Category.css';

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

  return (
    <>
      <Title>{data?.category?.name}</Title>

      <div className="Category__hero">
        <PreloadedImage src={logo} height={300} width={300} useImg />
      </div>

      {loading && 'Loading...'}
      {error && `ERROR: ${error?.message}`}
      {data?.category?.projects?.map((category) => {
        const { id, name } = category || {};
        return (
          <p key={id}>
            <Button href={`/project/${id}`}>{name}</Button>
          </p>
        );
      })}
    </>
  );
}
