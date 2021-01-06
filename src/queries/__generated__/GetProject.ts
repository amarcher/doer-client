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
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface GetProject_project_projectExecutions_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: GetProject_project_projectExecutions_images_image;
}

export interface GetProject_project_projectExecutions_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface GetProject_project_projectExecutions_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: GetProject_project_projectExecutions_posts_images_image;
}

export interface GetProject_project_projectExecutions_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetProject_project_projectExecutions_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetProject_project_projectExecutions_posts_user_profilePic | null;
}

export interface GetProject_project_projectExecutions_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface GetProject_project_projectExecutions_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (GetProject_project_projectExecutions_posts_images | null)[];
  user: GetProject_project_projectExecutions_posts_user;
  clapCount: number;
  claps: (GetProject_project_projectExecutions_posts_claps | null)[];
}

export interface GetProject_project_projectExecutions_project {
  __typename: "Project";
  name: string;
}

export interface GetProject_project_projectExecutions {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: GetProject_project_projectExecutions_user | null;
  images: (GetProject_project_projectExecutions_images | null)[];
  posts: (GetProject_project_projectExecutions_posts | null)[];
  projectId: string;
  project: GetProject_project_projectExecutions_project | null;
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
