/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateProjectExecutionInput, ImageUploadInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProjectExecution
// ====================================================

export interface CreateProjectExecution_createProjectExecution_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface CreateProjectExecution_createProjectExecution_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
}

export interface CreateProjectExecution_createProjectExecution_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  image: CreateProjectExecution_createProjectExecution_images_image;
}

export interface CreateProjectExecution_createProjectExecution {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: CreateProjectExecution_createProjectExecution_user | null;
  images: (CreateProjectExecution_createProjectExecution_images | null)[];
  projectId: string;
}

export interface CreateProjectExecution {
  /**
   * Create a project execution
   */
  createProjectExecution: CreateProjectExecution_createProjectExecution | null;
}

export interface CreateProjectExecutionVariables {
  projectExecutionInput: CreateProjectExecutionInput;
  imageUploadInputs?: (ImageUploadInput | null)[] | null;
}
