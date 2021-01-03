/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_profilePic {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
}

export interface GetUser_user_followers_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetUser_user_followers {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetUser_user_followers_profilePic | null;
}

export interface GetUser_user_following_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetUser_user_following {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetUser_user_following_profilePic | null;
}

export interface GetUser_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetUser_user_profilePic | null;
  followers: (GetUser_user_followers | null)[];
  following: (GetUser_user_following | null)[];
}

export interface GetUser {
  /**
   * Get a user
   */
  user: GetUser_user | null;
}

export interface GetUserVariables {
  id: string;
}
