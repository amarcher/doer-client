import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';
export type { LoginResponse as CreateUserResponse } from '../queries/Login';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profilePic: {
    hostedUrl: string;
  };
}

export interface UserWithFollows extends User {
  followers: User[];
  following: User[];
}

export default gql`
  mutation createUser(
    $createUserInput: CreateUserInput!
    $imageUploadInput: ImageUploadInput
  ) {
    createUser(
      createUserInput: $createUserInput
      imageUploadInput: $imageUploadInput
    ) {
      user {
        ...UserWithFollowsFragment
      }
      sessionToken
    }
  }
  ${UserWithFollowsFragment}
`;
