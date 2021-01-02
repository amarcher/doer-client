/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProjectExecution
// ====================================================

export interface GetProjectExecution_projectExecution_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface GetProjectExecution_projectExecution_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface GetProjectExecution_projectExecution_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: GetProjectExecution_projectExecution_images_image;
}

export interface GetProjectExecution_projectExecution_project {
  __typename: "Project";
  name: string;
}

export interface GetProjectExecution_projectExecution {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: GetProjectExecution_projectExecution_user | null;
  images: (GetProjectExecution_projectExecution_images | null)[];
  projectId: string;
  project: GetProjectExecution_projectExecution_project | null;
}

export interface GetProjectExecution {
  /**
   * One execution of a project
   */
  projectExecution: GetProjectExecution_projectExecution | null;
}

export interface GetProjectExecutionVariables {
  id: string;
}
