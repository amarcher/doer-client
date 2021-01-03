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
  imageTags: (string | null)[] | null;
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

export interface GetUser_user_projectMasteries {
  __typename: "ProjectMastery";
  projectId: string;
  masteryLevel: number;
}

export interface GetUser_user_categoryMasteries {
  __typename: "CategoryMastery";
  categoryId: string;
  masteryLevel: number;
}

export interface GetUser_user_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface GetUser_user_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: GetUser_user_posts_images_image;
}

export interface GetUser_user_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetUser_user_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetUser_user_posts_user_profilePic | null;
}

export interface GetUser_user_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (GetUser_user_posts_images | null)[];
  user: GetUser_user_posts_user;
  clapCount: number;
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
  projectMasteries: (GetUser_user_projectMasteries | null)[];
  categoryMasteries: (GetUser_user_categoryMasteries | null)[];
  posts: (GetUser_user_posts | null)[];
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
