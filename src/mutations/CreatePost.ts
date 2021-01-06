import { gql } from '@apollo/client';
import PostFragment from '../fragments/PostFragment';

export default gql`
  mutation CreatePost(
    $text: String!
    $userId: ID!
    $projectExecutionId: ID!
    $imageUploadInputs: [ImageUploadInput]
  ) {
    createPost(
      text: $text
      userId: $userId
      projectExecutionId: $projectExecutionId
      imageUploadInputs: $imageUploadInputs
    ) {
      ...PostFragment
    }
  }
  ${PostFragment}
`;
