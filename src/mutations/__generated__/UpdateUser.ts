/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImageUploadInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_profilePic {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface UpdateUser_updateUser_followers_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UpdateUser_updateUser_followers {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UpdateUser_updateUser_followers_profilePic | null;
}

export interface UpdateUser_updateUser_following_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UpdateUser_updateUser_following {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UpdateUser_updateUser_following_profilePic | null;
}

export interface UpdateUser_updateUser_projectMasteries {
  __typename: "ProjectMastery";
  projectId: string;
  masteryLevel: number;
}

export interface UpdateUser_updateUser_categoryMasteries {
  __typename: "CategoryMastery";
  categoryId: string;
  masteryLevel: number;
}

export interface UpdateUser_updateUser_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface UpdateUser_updateUser_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: UpdateUser_updateUser_posts_images_image;
}

export interface UpdateUser_updateUser_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UpdateUser_updateUser_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UpdateUser_updateUser_posts_user_profilePic | null;
}

export interface UpdateUser_updateUser_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface UpdateUser_updateUser_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (UpdateUser_updateUser_posts_images | null)[];
  user: UpdateUser_updateUser_posts_user;
  clapCount: number;
  claps: (UpdateUser_updateUser_posts_claps | null)[];
}

export interface UpdateUser_updateUser {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UpdateUser_updateUser_profilePic | null;
  followers: (UpdateUser_updateUser_followers | null)[];
  following: (UpdateUser_updateUser_following | null)[];
  projectMasteries: (UpdateUser_updateUser_projectMasteries | null)[];
  categoryMasteries: (UpdateUser_updateUser_categoryMasteries | null)[];
  posts: (UpdateUser_updateUser_posts | null)[];
}

export interface UpdateUser {
  /**
   * Update a user
   */
  updateUser: UpdateUser_updateUser | null;
}

export interface UpdateUserVariables {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  imageUploadInput?: ImageUploadInput | null;
}
