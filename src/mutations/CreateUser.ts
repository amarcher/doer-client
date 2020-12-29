import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';

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

export interface CreateUserResult {
  createUser: UserWithFollows;
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
      ...UserWithFollowsFragment
    }
  }
  ${UserWithFollowsFragment}
`;
