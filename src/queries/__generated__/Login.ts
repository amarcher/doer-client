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
  imageTags: (string | null)[] | null;
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

export interface Login_login_user_projectMasteries {
  __typename: "ProjectMastery";
  projectId: string;
  masteryLevel: number;
}

export interface Login_login_user_categoryMasteries {
  __typename: "CategoryMastery";
  categoryId: string;
  masteryLevel: number;
}

export interface Login_login_user_posts_projectExecution {
  __typename: "ProjectExecution";
  title: string | null;
}

export interface Login_login_user_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface Login_login_user_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: Login_login_user_posts_images_image;
}

export interface Login_login_user_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface Login_login_user_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: Login_login_user_posts_user_profilePic | null;
}

export interface Login_login_user_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface Login_login_user_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface Login_login_user_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: Login_login_user_posts_comments_user_profilePic | null;
}

export interface Login_login_user_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: Login_login_user_posts_comments_user;
}

export interface Login_login_user_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  projectExecution: Login_login_user_posts_projectExecution | null;
  images: (Login_login_user_posts_images | null)[];
  user: Login_login_user_posts_user;
  clapCount: number;
  claps: (Login_login_user_posts_claps | null)[];
  comments: (Login_login_user_posts_comments | null)[];
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
  projectMasteries: (Login_login_user_projectMasteries | null)[];
  categoryMasteries: (Login_login_user_categoryMasteries | null)[];
  posts: (Login_login_user_posts | null)[];
}

export interface Login_login {
  __typename: "LoginResponse";
  user: Login_login_user;
  sessionToken: string | null;
}

export interface Login {
  login: Login_login | null;
}
