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
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface ProjectExecutionFragment_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: ProjectExecutionFragment_images_image;
}

export interface ProjectExecutionFragment_posts_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface ProjectExecutionFragment_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface ProjectExecutionFragment_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: ProjectExecutionFragment_posts_images_image;
}

export interface ProjectExecutionFragment_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface ProjectExecutionFragment_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: ProjectExecutionFragment_posts_user_profilePic | null;
}

export interface ProjectExecutionFragment_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface ProjectExecutionFragment_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface ProjectExecutionFragment_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: ProjectExecutionFragment_posts_comments_user_profilePic | null;
}

export interface ProjectExecutionFragment_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: ProjectExecutionFragment_posts_comments_user;
}

export interface ProjectExecutionFragment_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: ProjectExecutionFragment_posts_projectExecution | null;
  images: (ProjectExecutionFragment_posts_images | null)[];
  user: ProjectExecutionFragment_posts_user;
  clapCount: number;
  claps: (ProjectExecutionFragment_posts_claps | null)[];
  comments: (ProjectExecutionFragment_posts_comments | null)[];
}

export interface ProjectExecutionFragment_project {
  __typename: "Project";
  name: string;
}

export interface ProjectExecutionFragment {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: ProjectExecutionFragment_user | null;
  images: (ProjectExecutionFragment_images | null)[];
  posts: (ProjectExecutionFragment_posts | null)[];
  projectId: string;
  project: ProjectExecutionFragment_project | null;
}
