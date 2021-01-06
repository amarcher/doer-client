import { gql } from '@apollo/client';

export default gql`
  mutation UpdatePost(
    $imageUploadInputs: [ImageUploadInput]
    $postId: ID!
    $text: String!
  ) {
    updatePost(
      imageUploadInputs: $imageUploadInputs
      text: $text
      postId: $postId
    )
  }
`;
