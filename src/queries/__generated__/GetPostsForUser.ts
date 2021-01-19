/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostsForUser
// ====================================================

export interface GetPostsForUser_postsForUser_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface GetPostsForUser_postsForUser_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface GetPostsForUser_postsForUser_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: GetPostsForUser_postsForUser_images_image;
}

export interface GetPostsForUser_postsForUser_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetPostsForUser_postsForUser_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetPostsForUser_postsForUser_user_profilePic | null;
}

export interface GetPostsForUser_postsForUser_claps {
  __typename: "Clap";
  userId: string;
}

export interface GetPostsForUser_postsForUser_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface GetPostsForUser_postsForUser_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: GetPostsForUser_postsForUser_comments_user_profilePic | null;
}

export interface GetPostsForUser_postsForUser_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: GetPostsForUser_postsForUser_comments_user;
}

export interface GetPostsForUser_postsForUser {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: GetPostsForUser_postsForUser_projectExecution | null;
  images: (GetPostsForUser_postsForUser_images | null)[];
  user: GetPostsForUser_postsForUser_user;
  clapCount: number;
  claps: (GetPostsForUser_postsForUser_claps | null)[];
  comments: (GetPostsForUser_postsForUser_comments | null)[];
}

export interface GetPostsForUser {
  /**
   * DEPRECATED
   */
  postsForUser: (GetPostsForUser_postsForUser | null)[] | null;
}

export interface GetPostsForUserVariables {
  userId: string;
}
