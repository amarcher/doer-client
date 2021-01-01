import React from 'react';
import { useQuery } from '@apollo/client';

import usePageTitle from '../../hooks/usePageTitle';
import { APP_NAME } from '../../constants';
import PreloadedImage from '../../components/PreloadedImage';
import Button from '../../components/Button';
import Title from '../../components/Title';
import GetCategories from '../../queries/GetCategories';
import { GetCategories as GetCategoriesResponse } from '../../queries/__generated__/GetCategories';
import logo from '../../logo2.svg';

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
        <PreloadedImage src={logo} height={300} width={300} useImg />
      </div>

      {loading && <p>Loading ...</p>}
      {error && <p>ERROR: {error?.message}</p>}
      {data?.categories && <p>Choose a category:</p>}
      {data?.categories &&
        data.categories.map((category) => {
          const { name, id, projects } = category || {};
          return (
            <p key={id}>
              <Button href={`/category/${id}`}>
                {name} ({projects?.length})
              </Button>
            </p>
          );
        })}
    </>
  );
}
