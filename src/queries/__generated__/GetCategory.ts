/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategory
// ====================================================

export interface GetCategory_category_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface GetCategory_category {
  __typename: "Category";
  id: string;
  name: string;
  projects: (GetCategory_category_projects | null)[] | null;
}

export interface GetCategory {
  /**
   * A category of project
   */
  category: GetCategory_category | null;
}

export interface GetCategoryVariables {
  id: string;
}
