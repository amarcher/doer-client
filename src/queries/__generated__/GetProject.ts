/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProject
// ====================================================

export interface GetProject_project_projectExecutions_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface GetProject_project_projectExecutions_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
}

export interface GetProject_project_projectExecutions_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  image: GetProject_project_projectExecutions_images_image;
}

export interface GetProject_project_projectExecutions {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: GetProject_project_projectExecutions_user | null;
  images: (GetProject_project_projectExecutions_images | null)[];
}

export interface GetProject_project {
  __typename: "Project";
  id: string;
  name: string;
  projectExecutions: (GetProject_project_projectExecutions | null)[];
}

export interface GetProject {
  /**
   * A type of project that one may want to do
   */
  project: GetProject_project | null;
}

export interface GetProjectVariables {
  id: string;
}
