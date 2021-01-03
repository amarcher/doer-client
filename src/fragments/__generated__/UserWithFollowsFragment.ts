/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserWithFollowsFragment
// ====================================================

export interface UserWithFollowsFragment_profilePic {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
}

export interface UserWithFollowsFragment_followers_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UserWithFollowsFragment_followers {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UserWithFollowsFragment_followers_profilePic | null;
}

export interface UserWithFollowsFragment_following_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UserWithFollowsFragment_following {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UserWithFollowsFragment_following_profilePic | null;
}

export interface UserWithFollowsFragment {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UserWithFollowsFragment_profilePic | null;
  followers: (UserWithFollowsFragment_followers | null)[];
  following: (UserWithFollowsFragment_following | null)[];
}
