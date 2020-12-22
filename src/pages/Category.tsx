import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router';

import PreloadedImage from '../components/PreloadedImage';

import './Category.css';

interface Project {
  id: number
  name: string
}

interface Category {
  id: number
  project: Project[]
}

export const GET_CATEGORY = gql`
  query GetCategory($categoryId: ID!) {
    category(id: $categoryId) {
      name
      project {
        id
        name
      }
    }
  }
`;


type Props = RouteComponentProps<{ categoryId: string }>;

function Category({ match: { params: { categoryId } } }: Props) {
  const { data, loading, error } = useQuery<{ category: Category }>(
    GET_CATEGORY, {
      variables: {
        category: { id: parseInt(categoryId, 10) },
      },
    }
  );

  return (
    <>
      <div className="Category__hero">
        <PreloadedImage src="https://miro.medium.com/max/2438/1*TsArd-pBgSQqMXyFV5C-Wg.jpeg" height={500} width={500} />
      </div>

      {loading && 'Loading ...'}
      {error && `ERROR: ${error?.message}`}
      {data?.category?.project?.map(({ id, name }) => <p key={id}>{name}</p>)}
    </>
  );
}

export default Category;
