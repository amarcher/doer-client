import React from 'react';
import { useQuery } from '@apollo/client';

import usePageTitle from '../../hooks/usePageTitle';
import { APP_NAME } from '../../constants';
import PreloadedImage from '../../components/PreloadedImage';
import Button from '../../components/Button';
import Title from '../../components/Title';
import GetCategories, { GetCategoriesResponse } from '../../queries/GetCategories';

import './Main.css';

export default function Main() {
  const { data, loading, error } = useQuery<GetCategoriesResponse>(
    GetCategories
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
        <p key={id}><Button href={`/category/${id}`}>{name} ({projects.length})</Button></p>
      ))}
    </>
  );
}
