/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface GetPost_post_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: GetPost_post_images_image;
}

export interface GetPost_post_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetPost_post_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetPost_post_user_profilePic | null;
}

export interface GetPost_post_claps {
  __typename: "Clap";
  userId: string;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (GetPost_post_images | null)[];
  user: GetPost_post_user;
  clapCount: number;
  claps: (GetPost_post_claps | null)[];
}

export interface GetPost {
  /**
   * Get an individual post
   */
  post: GetPost_post | null;
}

export interface GetPostVariables {
  postId: string;
}
