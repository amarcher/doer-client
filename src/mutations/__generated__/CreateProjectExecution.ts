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
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface CreateProjectExecution_createProjectExecution_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: CreateProjectExecution_createProjectExecution_images_image;
}

export interface CreateProjectExecution_createProjectExecution_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface CreateProjectExecution_createProjectExecution_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: CreateProjectExecution_createProjectExecution_posts_images_image;
}

export interface CreateProjectExecution_createProjectExecution_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateProjectExecution_createProjectExecution_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateProjectExecution_createProjectExecution_posts_user_profilePic | null;
}

export interface CreateProjectExecution_createProjectExecution_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface CreateProjectExecution_createProjectExecution_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateProjectExecution_createProjectExecution_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateProjectExecution_createProjectExecution_posts_comments_user_profilePic | null;
}

export interface CreateProjectExecution_createProjectExecution_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: CreateProjectExecution_createProjectExecution_posts_comments_user;
}

export interface CreateProjectExecution_createProjectExecution_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (CreateProjectExecution_createProjectExecution_posts_images | null)[];
  user: CreateProjectExecution_createProjectExecution_posts_user;
  clapCount: number;
  claps: (CreateProjectExecution_createProjectExecution_posts_claps | null)[];
  comments: (CreateProjectExecution_createProjectExecution_posts_comments | null)[];
}

export interface CreateProjectExecution_createProjectExecution_project {
  __typename: "Project";
  name: string;
}

export interface CreateProjectExecution_createProjectExecution {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: CreateProjectExecution_createProjectExecution_user | null;
  images: (CreateProjectExecution_createProjectExecution_images | null)[];
  posts: (CreateProjectExecution_createProjectExecution_posts | null)[];
  projectId: string;
  project: CreateProjectExecution_createProjectExecution_project | null;
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
