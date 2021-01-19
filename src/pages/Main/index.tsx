import React from 'react';
import { useQuery } from '@apollo/client';

import usePageTitle from '../../hooks/usePageTitle';
import { APP_NAME } from '../../constants';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import PostsForUser from '../../components/PostsForUser';
import CreateCategoryForm from '../../components/CategoryForm';
import GetCategories from '../../queries/GetCategories';
import { GetCategories as GetCategoriesResponse } from '../../queries/__generated__/GetCategories';
import Loading from '../../components/Loading';

import './Main.css';

export default function Main() {
  const { data, loading, error } = useQuery<GetCategoriesResponse>(
    GetCategories
  );

  usePageTitle();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>ERROR: {error?.message}</div>;
  }

  return (
    <>
      <Title>{APP_NAME}</Title>

      <div className="Main__hero">
        <Logo />
      </div>

      <PostsForUser />

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

      <CreateCategoryForm />
    </>
  );
}
