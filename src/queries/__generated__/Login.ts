/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Login
// ====================================================

export interface Login_login_user_profilePic {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
}

export interface Login_login_user_followers_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface Login_login_user_followers {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: Login_login_user_followers_profilePic | null;
}

export interface Login_login_user_following_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface Login_login_user_following {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: Login_login_user_following_profilePic | null;
}

export interface Login_login_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: Login_login_user_profilePic | null;
  followers: (Login_login_user_followers | null)[];
  following: (Login_login_user_following | null)[];
}

export interface Login_login {
  __typename: "LoginResponse";
  user: Login_login_user;
  sessionToken: string | null;
}

export interface Login {
  login: Login_login | null;
}
