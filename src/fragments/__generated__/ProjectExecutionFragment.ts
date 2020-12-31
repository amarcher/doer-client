/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectExecutionFragment
// ====================================================

export interface ProjectExecutionFragment_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface ProjectExecutionFragment_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
}

export interface ProjectExecutionFragment_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  image: ProjectExecutionFragment_images_image;
}

export interface ProjectExecutionFragment {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: ProjectExecutionFragment_user | null;
  images: (ProjectExecutionFragment_images | null)[];
}
