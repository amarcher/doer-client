/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateProject
// ====================================================

export interface CreateProject_createProject_projectExecutions_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  id: string;
}

export interface CreateProject_createProject_projectExecutions_images_image {
  __typename: "Image";
  hostedUrl: string;
  id: string;
  timeTaken: any | null;
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface CreateProject_createProject_projectExecutions_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: CreateProject_createProject_projectExecutions_images_image;
}

export interface CreateProject_createProject_projectExecutions_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface CreateProject_createProject_projectExecutions_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: CreateProject_createProject_projectExecutions_posts_images_image;
}

export interface CreateProject_createProject_projectExecutions_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateProject_createProject_projectExecutions_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateProject_createProject_projectExecutions_posts_user_profilePic | null;
}

export interface CreateProject_createProject_projectExecutions_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface CreateProject_createProject_projectExecutions_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateProject_createProject_projectExecutions_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateProject_createProject_projectExecutions_posts_comments_user_profilePic | null;
}

export interface CreateProject_createProject_projectExecutions_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: CreateProject_createProject_projectExecutions_posts_comments_user;
}

export interface CreateProject_createProject_projectExecutions_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (CreateProject_createProject_projectExecutions_posts_images | null)[];
  user: CreateProject_createProject_projectExecutions_posts_user;
  clapCount: number;
  claps: (CreateProject_createProject_projectExecutions_posts_claps | null)[];
  comments: (CreateProject_createProject_projectExecutions_posts_comments | null)[];
}

export interface CreateProject_createProject_projectExecutions_project {
  __typename: "Project";
  name: string;
}

export interface CreateProject_createProject_projectExecutions {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: CreateProject_createProject_projectExecutions_user | null;
  images: (CreateProject_createProject_projectExecutions_images | null)[];
  posts: (CreateProject_createProject_projectExecutions_posts | null)[];
  projectId: string;
  project: CreateProject_createProject_projectExecutions_project | null;
}

export interface CreateProject_createProject {
  __typename: "Project";
  id: string;
  name: string;
  projectExecutions: (CreateProject_createProject_projectExecutions | null)[];
}

export interface CreateProject {
  /**
   * Create a project
   */
  createProject: CreateProject_createProject | null;
}

export interface CreateProjectVariables {
  name: string;
  categoryId: string;
}
