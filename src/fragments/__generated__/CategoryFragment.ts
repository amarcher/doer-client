/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryFragment
// ====================================================

export interface CategoryFragment_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface CategoryFragment {
  __typename: "Category";
  id: string;
  name: string;
  projects: (CategoryFragment_projects | null)[] | null;
}
