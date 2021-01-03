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
