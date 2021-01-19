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
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface ProjectFragment_projectExecutions_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: ProjectFragment_projectExecutions_images_image;
}

export interface ProjectFragment_projectExecutions_posts_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface ProjectFragment_projectExecutions_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface ProjectFragment_projectExecutions_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: ProjectFragment_projectExecutions_posts_images_image;
}

export interface ProjectFragment_projectExecutions_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface ProjectFragment_projectExecutions_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: ProjectFragment_projectExecutions_posts_user_profilePic | null;
}

export interface ProjectFragment_projectExecutions_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface ProjectFragment_projectExecutions_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface ProjectFragment_projectExecutions_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: ProjectFragment_projectExecutions_posts_comments_user_profilePic | null;
}

export interface ProjectFragment_projectExecutions_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: ProjectFragment_projectExecutions_posts_comments_user;
}

export interface ProjectFragment_projectExecutions_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: ProjectFragment_projectExecutions_posts_projectExecution | null;
  images: (ProjectFragment_projectExecutions_posts_images | null)[];
  user: ProjectFragment_projectExecutions_posts_user;
  clapCount: number;
  claps: (ProjectFragment_projectExecutions_posts_claps | null)[];
  comments: (ProjectFragment_projectExecutions_posts_comments | null)[];
}

export interface ProjectFragment_projectExecutions_project {
  __typename: "Project";
  name: string;
}

export interface ProjectFragment_projectExecutions {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: ProjectFragment_projectExecutions_user | null;
  images: (ProjectFragment_projectExecutions_images | null)[];
  posts: (ProjectFragment_projectExecutions_posts | null)[];
  projectId: string;
  project: ProjectFragment_projectExecutions_project | null;
}

export interface ProjectFragment {
  __typename: "Project";
  id: string;
  name: string;
  projectExecutions: (ProjectFragment_projectExecutions | null)[];
}
