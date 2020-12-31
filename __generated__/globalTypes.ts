/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateProjectExecutionInput {
  userId: string;
  projectId: string;
  startedAt: any;
  title?: string | null;
}

export interface CreateUserInput {
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
}

/**
 * This is the input to upload an image, with the hosted url from cloudinary
 */
export interface ImageUploadInput {
  hostedUrl: string;
  caption?: string | null;
  timeTaken: any;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
