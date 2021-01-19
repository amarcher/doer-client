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
  imageTags: (string | null)[] | null;
  publicId: string | null;
}

export interface UpdateProjectExecution_updateProjectExecution_images {
  __typename: "ProjectExecutionImage";
  caption: string | null;
  order: number | null;
  image: UpdateProjectExecution_updateProjectExecution_images_image;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: UpdateProjectExecution_updateProjectExecution_posts_images_image;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UpdateProjectExecution_updateProjectExecution_posts_user_profilePic | null;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UpdateProjectExecution_updateProjectExecution_posts_comments_user_profilePic | null;
}

export interface UpdateProjectExecution_updateProjectExecution_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: UpdateProjectExecution_updateProjectExecution_posts_comments_user;
}

export interface UpdateProjectExecution_updateProjectExecution_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: UpdateProjectExecution_updateProjectExecution_posts_projectExecution | null;
  images: (UpdateProjectExecution_updateProjectExecution_posts_images | null)[];
  user: UpdateProjectExecution_updateProjectExecution_posts_user;
  clapCount: number;
  claps: (UpdateProjectExecution_updateProjectExecution_posts_claps | null)[];
  comments: (UpdateProjectExecution_updateProjectExecution_posts_comments | null)[];
}

export interface UpdateProjectExecution_updateProjectExecution_project {
  __typename: "Project";
  name: string;
}

export interface UpdateProjectExecution_updateProjectExecution {
  __typename: "ProjectExecution";
  id: string;
  title: string | null;
  startedAt: any;
  completedAt: any | null;
  user: UpdateProjectExecution_updateProjectExecution_user | null;
  images: (UpdateProjectExecution_updateProjectExecution_images | null)[];
  posts: (UpdateProjectExecution_updateProjectExecution_posts | null)[];
  projectId: string;
  project: UpdateProjectExecution_updateProjectExecution_project | null;
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
