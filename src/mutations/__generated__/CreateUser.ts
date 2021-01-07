/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, ImageUploadInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser_user_profilePic {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface CreateUser_createUser_user_followers_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateUser_createUser_user_followers {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateUser_createUser_user_followers_profilePic | null;
}

export interface CreateUser_createUser_user_following_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateUser_createUser_user_following {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateUser_createUser_user_following_profilePic | null;
}

export interface CreateUser_createUser_user_projectMasteries {
  __typename: "ProjectMastery";
  projectId: string;
  masteryLevel: number;
}

export interface CreateUser_createUser_user_categoryMasteries {
  __typename: "CategoryMastery";
  categoryId: string;
  masteryLevel: number;
}

export interface CreateUser_createUser_user_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface CreateUser_createUser_user_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: CreateUser_createUser_user_posts_images_image;
}

export interface CreateUser_createUser_user_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateUser_createUser_user_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateUser_createUser_user_posts_user_profilePic | null;
}

export interface CreateUser_createUser_user_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface CreateUser_createUser_user_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateUser_createUser_user_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateUser_createUser_user_posts_comments_user_profilePic | null;
}

export interface CreateUser_createUser_user_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: CreateUser_createUser_user_posts_comments_user;
}

export interface CreateUser_createUser_user_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (CreateUser_createUser_user_posts_images | null)[];
  user: CreateUser_createUser_user_posts_user;
  clapCount: number;
  claps: (CreateUser_createUser_user_posts_claps | null)[];
  comments: (CreateUser_createUser_user_posts_comments | null)[];
}

export interface CreateUser_createUser_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateUser_createUser_user_profilePic | null;
  followers: (CreateUser_createUser_user_followers | null)[];
  following: (CreateUser_createUser_user_following | null)[];
  projectMasteries: (CreateUser_createUser_user_projectMasteries | null)[];
  categoryMasteries: (CreateUser_createUser_user_categoryMasteries | null)[];
  posts: (CreateUser_createUser_user_posts | null)[];
}

export interface CreateUser_createUser {
  __typename: "LoginResponse";
  user: CreateUser_createUser_user;
  sessionToken: string | null;
}

export interface CreateUser {
  /**
   * Create a user
   */
  createUser: CreateUser_createUser | null;
}

export interface CreateUserVariables {
  createUserInput: CreateUserInput;
  imageUploadInput?: ImageUploadInput | null;
}
