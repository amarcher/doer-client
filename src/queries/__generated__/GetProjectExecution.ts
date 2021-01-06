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

export interface GetProjectExecution_projectExecution_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface GetProjectExecution_projectExecution_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: GetProjectExecution_projectExecution_posts_images_image;
}

export interface GetProjectExecution_projectExecution_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetProjectExecution_projectExecution_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetProjectExecution_projectExecution_posts_user_profilePic | null;
}

export interface GetProjectExecution_projectExecution_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface GetProjectExecution_projectExecution_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (GetProjectExecution_projectExecution_posts_images | null)[];
  user: GetProjectExecution_projectExecution_posts_user;
  clapCount: number;
  claps: (GetProjectExecution_projectExecution_posts_claps | null)[];
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
  posts: (GetProjectExecution_projectExecution_posts | null)[];
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
