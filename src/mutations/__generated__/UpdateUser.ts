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
