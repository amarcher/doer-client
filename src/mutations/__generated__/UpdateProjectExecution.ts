/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProjectExecution
// ====================================================

export interface UpdateProjectExecution_updateProjectExecution_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface UpdateProjectExecution_updateProjectExecution_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
}

export interface UpdateProjectExecution_updateProjectExecution_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  image: UpdateProjectExecution_updateProjectExecution_images_image;
}

export interface UpdateProjectExecution_updateProjectExecution {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: UpdateProjectExecution_updateProjectExecution_user | null;
  images: (UpdateProjectExecution_updateProjectExecution_images | null)[];
  projectId: string;
}

export interface UpdateProjectExecution {
  /**
   * Update project execution
   */
  updateProjectExecution: UpdateProjectExecution_updateProjectExecution | null;
}

export interface UpdateProjectExecutionVariables {
  id: string;
  title?: string | null;
  completedAt?: any | null;
}
