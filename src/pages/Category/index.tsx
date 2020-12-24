import React from 'react';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../../hooks/usePageTitle';
import Button from '../../components/Button';
import PreloadedImage from '../../components/PreloadedImage';
import Title from '../../components/Title';
import GetCategory, { GetCategoryResponse } from '../../queries/GetCategory';

import './Category.css';

type Props = RouteComponentProps<{ categoryId: string }>;

export default function Category({ match: { params: { categoryId } } }: Props) {
  const { data, loading, error } = useQuery<GetCategoryResponse>(
    GetCategory, {
      variables: {
        id: parseInt(categoryId, 10),
      },
    }
  );
  
  usePageTitle(data?.category.name);

  return (
    <>
      <Title>{data?.category.name}</Title>

      <div className="Category__hero">
        <PreloadedImage src="https://miro.medium.com/max/2438/1*TsArd-pBgSQqMXyFV5C-Wg.jpeg" height={500} width={500} />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      {data?.category?.projects?.map(({ id, name }) => (
        <p key={id}>
          <Button href={`/project/${id}`}>
            {name}
          </Button>
        </p>
      ))}
    </>
  );
}