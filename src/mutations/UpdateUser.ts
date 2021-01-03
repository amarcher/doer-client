import { gql } from '@apollo/client';
import UserWithFollowsFragment from '../fragments/UserWithFollowsFragment';

export default gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $bio: String
    $imageUploadInput: ImageUploadInput
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      imageUploadInput: $imageUploadInput
    ) {
      ...UserWithFollowsFragment
    }
  }
  ${UserWithFollowsFragment}
`;
