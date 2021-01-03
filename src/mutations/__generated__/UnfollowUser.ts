/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnfollowUser
// ====================================================

export interface UnfollowUser {
  /**
   * Unfollow user
   */
  unfollowUser: boolean | null;
}

export interface UnfollowUserVariables {
  userId: string;
  recipientId: string;
}
