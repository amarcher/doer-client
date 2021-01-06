/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImageUploadInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePost
// ====================================================

export interface UpdatePost {
  /**
   * Update a post
   */
  updatePost: boolean | null;
}

export interface UpdatePostVariables {
  imageUploadInputs?: (ImageUploadInput | null)[] | null;
  postId: string;
  text: string;
}
