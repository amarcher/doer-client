/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, ImageUploadInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface createUser_createUser_user_followers_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface createUser_createUser_user_followers {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: createUser_createUser_user_followers_profilePic | null;
}

export interface createUser_createUser_user_following_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface createUser_createUser_user_following {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: createUser_createUser_user_following_profilePic | null;
}

export interface createUser_createUser_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: createUser_createUser_user_profilePic | null;
  followers: (createUser_createUser_user_followers | null)[];
  following: (createUser_createUser_user_following | null)[];
}

export interface createUser_createUser {
  __typename: "LoginResponse";
  user: createUser_createUser_user;
  sessionToken: string | null;
}

export interface createUser {
  /**
   * Create a user
   */
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  createUserInput: CreateUserInput;
  imageUploadInput?: ImageUploadInput | null;
}
