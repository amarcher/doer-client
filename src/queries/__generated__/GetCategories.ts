/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_categories_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface GetCategories_categories {
  __typename: "Category";
  id: string;
  name: string;
  projects: (GetCategories_categories_projects | null)[] | null;
}

export interface GetCategories {
  /**
   * All categories
   */
  categories: (GetCategories_categories | null)[] | null;
}
