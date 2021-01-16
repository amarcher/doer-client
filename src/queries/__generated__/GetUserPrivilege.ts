/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPrivilege
// ====================================================

export interface GetUserPrivilege_userPrivilege {
  __typename: "UserPrivilege";
  privilege: string;
  userId: string;
}

export interface GetUserPrivilege {
  /**
   * Get user privilege
   */
  userPrivilege: GetUserPrivilege_userPrivilege | null;
}

export interface GetUserPrivilegeVariables {
  userId: string;
}
