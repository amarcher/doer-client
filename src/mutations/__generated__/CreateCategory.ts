/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCategory
// ====================================================

export interface CreateCategory_createCategory_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface CreateCategory_createCategory {
  __typename: "Category";
  id: string;
  name: string;
  projects: (CreateCategory_createCategory_projects | null)[] | null;
}

export interface CreateCategory {
  /**
   * Create a category
   */
  createCategory: CreateCategory_createCategory | null;
}

export interface CreateCategoryVariables {
  name: string;
}
