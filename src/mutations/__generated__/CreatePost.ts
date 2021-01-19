/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImageUploadInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface CreatePost_createPost_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface CreatePost_createPost_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: CreatePost_createPost_images_image;
}

export interface CreatePost_createPost_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreatePost_createPost_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreatePost_createPost_user_profilePic | null;
}

export interface CreatePost_createPost_claps {
  __typename: "Clap";
  userId: string;
}

export interface CreatePost_createPost_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreatePost_createPost_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreatePost_createPost_comments_user_profilePic | null;
}

export interface CreatePost_createPost_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: CreatePost_createPost_comments_user;
}

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: CreatePost_createPost_projectExecution | null;
  images: (CreatePost_createPost_images | null)[];
  user: CreatePost_createPost_user;
  clapCount: number;
  claps: (CreatePost_createPost_claps | null)[];
  comments: (CreatePost_createPost_comments | null)[];
}

export interface CreatePost {
  /**
   * Create a post
   */
  createPost: CreatePost_createPost | null;
}

export interface CreatePostVariables {
  text: string;
  userId: string;
  projectExecutionId: string;
  imageUploadInputs?: (ImageUploadInput | null)[] | null;
}
