import { gql } from '@apollo/client';

export default gql`
  fragment ImageFragment on Image {
    id
    hostedUrl
    timeTaken
    publicId
    imageTags
  }
`;
