import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useCurrentUserPrivilege } from '../queries/GetUserPrivilege';
import { PRIVILEGES } from '../constants';
import CategoryFragment from '../fragments/CategoryFragment';
import { CategoryFragment as CategoryFragmentType } from '../fragments/__generated__/CategoryFragment';
import Button from './Button';

import './ProjectForm.css';
import CreateProject from '../mutations/CreateProject';
import { CreateProject as CreateProjectResponse } from '../mutations/__generated__/CreateProject';

interface Props {
  categoryId?: string;
  project?: CategoryFragmentType;
}

export default function ProjectForm({ categoryId, project }: Props) {
  const currentUserPrivilege = useCurrentUserPrivilege();

  const [projectInput, setProjectInput] = useState({
    name: project?.name || '',
    categoryId,
  });
  useEffect(() => {
    setProjectInput({ name: project?.name || '', categoryId });
  }, [project?.name, categoryId]);

  const [createProject] = useMutation<CreateProjectResponse>(CreateProject, {
    variables: projectInput,

    update(cache, { data }) {
      if (data?.createProject) {
        const fragmentOptions = {
          fragment: CategoryFragment,
          fragmentName: 'CategoryFragment',
          id: `Category:${categoryId}`,
        };

        const existingCategory = cache.readFragment<CategoryFragmentType>(
          fragmentOptions
        );

        if (existingCategory) {
          cache.writeFragment<CategoryFragmentType>({
            ...fragmentOptions,
            data: {
              ...existingCategory,
              projects: [
                ...(existingCategory?.projects || []),
                data?.createProject,
              ],
            },
          });
        }
      }
    },
  });

  // TODO: Add support for updateProject once mutation is supported

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectInput((projectInput) => ({
      ...projectInput,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onSubmit = useCallback(() => {
    if (!project) {
      createProject();
    } else {
      /* updateProject */
    }

    setProjectInput({ name: '', categoryId });
  }, [createProject, categoryId, project]);

  if (
    !(
      currentUserPrivilege === PRIVILEGES.ADMIN ||
      currentUserPrivilege === PRIVILEGES.PROJECT_ADMIN
    )
  ) {
    return null;
  }

  return (
    <form className="ProjectForm__form">
      <label className="ProjectForm__label">
        <span className="ProjectForm__label_text">Name</span>
        <div className="ProjectForm__input_and_button">
          <input
            name="name"
            value={projectInput?.name || ''}
            onChange={onChange}
            className="ProjectForm__input"
          />
          <Button className="ProjectForm__submit_button" onPress={onSubmit}>
            {project ? 'Update' : 'Create'}
          </Button>
        </div>
      </label>
    </form>
  );
}
