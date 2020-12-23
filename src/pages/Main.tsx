import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';

import usePageTitle from '../hooks/usePageTitle';
import { APP_NAME } from '../constants';
import PreloadedImage from '../components/PreloadedImage';
import Title from '../components/Title';

import './Main.css';

interface Category {
  id: number
  name: string
  projects: number[]
}

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      projects {
        id
      }
    }
  }
`;

export default function Main() {
  const { data, loading, error } = useQuery<{ categories: Category[] }>(
    GET_CATEGORIES
  );
  
  usePageTitle();

  return (
    <>
      <Title>{APP_NAME}</Title>

      <div className="Main__hero">
        <PreloadedImage src="https://miro.medium.com/max/2438/1*TsArd-pBgSQqMXyFV5C-Wg.jpeg" height={500} width={500} />
      </div>

      {loading && (<p>Loading ...</p>)}
      {error && (<p>ERROR: {error?.message}</p>)}
      {data?.categories && (
        <p>Choose a category:</p>
      )}
      {data?.categories && data.categories.map(({ name, id, projects }) => (
        <p key={id}><NavLink to={`/category/${id}`}>{name} ({projects.length})</NavLink></p>
      ))}
    </>
  );
}