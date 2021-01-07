/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment_user_profilePic {
  __typename: "Image";
  hostedUrl: string;
}

export interface CreateComment_createComment_user {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  bio: string | null;
  id: string;
  profilePic: CreateComment_createComment_user_profilePic | null;
}

export interface CreateComment_createComment {
  __typename: "Comment";
  id: string;
  createdAt: any;
  text: string;
  postId: string;
  userId: string;
  user: CreateComment_createComment_user;
}

export interface CreateComment {
  /**
   * Create a comment
   */
  createComment: CreateComment_createComment | null;
}

export interface CreateCommentVariables {
  text: string;
  userId: string;
  postId: string;
}
