import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import usePageTitle from '../hooks/usePageTitle';
import Button from '../components/Button';
import PreloadedImage from '../components/PreloadedImage';
import Title from '../components/Title';

import './Category.css';

interface Project {
  id: number
  name: string
}

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      projects {
        id
        name
      }
    }
  }
`;


type Props = RouteComponentProps<{ categoryId: string }>;

export default function Category({ match: { params: { categoryId } } }: Props) {
  const { data, loading, error } = useQuery<{ category: { name: string; projects: Project[] } }>(
    GET_CATEGORY, {
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
