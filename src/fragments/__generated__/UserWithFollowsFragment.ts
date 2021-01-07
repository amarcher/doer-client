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
  imageTags: (string | null)[] | null;
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

export interface UserWithFollowsFragment_projectMasteries {
  __typename: "ProjectMastery";
  projectId: string;
  masteryLevel: number;
}

export interface UserWithFollowsFragment_categoryMasteries {
  __typename: "CategoryMastery";
  categoryId: string;
  masteryLevel: number;
}

export interface UserWithFollowsFragment_posts_images_image {
  __typename: "Image";
  id: string;
  hostedUrl: string;
  timeTaken: any | null;
  publicId: string | null;
  imageTags: (string | null)[] | null;
}

export interface UserWithFollowsFragment_posts_images {
  __typename: "ProjectExecutionImage";
  imageId: string;
  caption: string | null;
  order: number | null;
  image: UserWithFollowsFragment_posts_images_image;
}

export interface UserWithFollowsFragment_posts_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UserWithFollowsFragment_posts_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UserWithFollowsFragment_posts_user_profilePic | null;
}

export interface UserWithFollowsFragment_posts_claps {
  __typename: "Clap";
  userId: string;
}

export interface UserWithFollowsFragment_posts_comments_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface UserWithFollowsFragment_posts_comments_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: UserWithFollowsFragment_posts_comments_user_profilePic | null;
}

export interface UserWithFollowsFragment_posts_comments {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: UserWithFollowsFragment_posts_comments_user;
}

export interface UserWithFollowsFragment_posts {
  __typename: "Post";
  id: string;
  userId: string;
  createdAt: any;
  text: string;
  projectExecutionId: string;
  images: (UserWithFollowsFragment_posts_images | null)[];
  user: UserWithFollowsFragment_posts_user;
  clapCount: number;
  claps: (UserWithFollowsFragment_posts_claps | null)[];
  comments: (UserWithFollowsFragment_posts_comments | null)[];
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
  projectMasteries: (UserWithFollowsFragment_projectMasteries | null)[];
  categoryMasteries: (UserWithFollowsFragment_categoryMasteries | null)[];
  posts: (UserWithFollowsFragment_posts | null)[];
}
