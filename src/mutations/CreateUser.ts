import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';

export default gql`
  mutation CreateUser(
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
