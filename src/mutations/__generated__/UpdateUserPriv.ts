/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserPriv
// ====================================================

export interface UpdateUserPriv_updateUserPriv {
  __typename: "UserPrivilege";
  privilege: string;
}

export interface UpdateUserPriv {
  /**
   * ONLY FOR DEVELOPMENT
   */
  updateUserPriv: UpdateUserPriv_updateUserPriv | null;
}

export interface UpdateUserPrivVariables {
  userId: string;
  privilege: string;
}
