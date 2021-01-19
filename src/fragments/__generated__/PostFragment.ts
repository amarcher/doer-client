/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostFragment
// ====================================================

export interface PostFragment_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface PostFragment_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface PostFragment_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: PostFragment_images_image;
}

export interface PostFragment_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface PostFragment_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: PostFragment_user_profilePic | null;
}

export interface PostFragment_claps {
  __typename: "Clap";
  userId: string;
}

export interface PostFragment_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface PostFragment_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: PostFragment_comments_user_profilePic | null;
}

export interface PostFragment_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: PostFragment_comments_user;
}

export interface PostFragment {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: PostFragment_projectExecution | null;
  images: (PostFragment_images | null)[];
  user: PostFragment_user;
  clapCount: number;
  claps: (PostFragment_claps | null)[];
  comments: (PostFragment_comments | null)[];
}
