/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectFragment
// ====================================================

export interface ProjectFragment_projectExecutions_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface ProjectFragment_projectExecutions_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
}

export interface ProjectFragment_projectExecutions_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  image: ProjectFragment_projectExecutions_images_image;
}

export interface ProjectFragment_projectExecutions {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: ProjectFragment_projectExecutions_user | null;
  images: (ProjectFragment_projectExecutions_images | null)[];
  projectId: string;
}

export interface ProjectFragment {
  __typename: "Project";
  id: string;
  name: string;
  projectExecutions: (ProjectFragment_projectExecutions | null)[];
}
