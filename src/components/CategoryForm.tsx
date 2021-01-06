import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useCurrentUserPrivilege } from '../queries/GetUserPrivilege';
import { PRIVILEGES } from '../constants';
import { CategoryFragment as CategoryFragmentType } from '../fragments/__generated__/CategoryFragment';
import CreateCategory from '../mutations/CreateCategory';
import { CreateCategory as CreateCategoryResponse } from '../mutations/__generated__/CreateCategory';
import Button from './Button';
import { GetCategories as GetCategoriesResponse } from '../queries/__generated__/GetCategories';
import GetCategories from '../queries/GetCategories';

import './CategoryForm.css';

interface Props {
  category?: CategoryFragmentType;
}

export default function CategoryForm({ category }: Props) {
  const currentUserPrivilege = useCurrentUserPrivilege();

  const [categoryInput, setCategoryInput] = useState({
    name: category?.name || '',
  });
  useEffect(() => {
    setCategoryInput({ name: category?.name || '' });
  }, [category?.name]);

  const [createCategory] = useMutation<CreateCategoryResponse>(CreateCategory, {
    variables: {
      name: categoryInput.name,
    },

    update(cache, { data }) {
      if (data?.createCategory) {
        const existingCategories = cache.readQuery<GetCategoriesResponse>({
          query: GetCategories,
        });

        cache.writeQuery<GetCategoriesResponse>({
          query: GetCategories,
          data: {
            categories: [
              ...(existingCategories?.categories || []),
              data?.createCategory,
            ],
          },
        });
      }
    },
  });

  // TODO: Add support for updateCategory once mutation is supported

  // const [updateCategory] = useMutation(UpdateCategory, {
  //   variables: {
  //     name: categoryInput.name,
  //   },

  //   update(cache, { data }) {
  //     cache.writeQuery<GetUserPrivilegeResponse>({
  //       query: GetUserPrivilege,
  //       variables: {
  //         userId: currentUserId,
  //       },
  //       data,
  //     });
  //   },
  // });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput((prevCategoryInput) => ({
      ...prevCategoryInput,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onSubmit = useCallback(() => {
    if (!category) {
      createCategory();
    } else {
      /* updateCategory */
    }

    setCategoryInput({ name: '' });
  }, [createCategory, category]);

  if (currentUserPrivilege !== PRIVILEGES.ADMIN) {
    return null;
  }

  return (
    <form className="CategoryForm__form">
      <label className="CategoryForm__label">
        <span className="CategoryForm__label_text">Name</span>
        <div className="CategoryForm__input_and_button">
          <input
            name="name"
            value={categoryInput?.name || ''}
            onChange={onChange}
            className="CategoryForm__input"
          />
          <Button className="CategoryForm__submit_button" onPress={onSubmit}>
            {category ? 'Update' : 'Create'}
          </Button>
        </div>
      </label>
    </form>
  );
}
