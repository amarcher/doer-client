import { gql } from '@apollo/client';

export default gql`
  fragment ProjectExecutionFragment on ProjectExecution {
    id
    title
    startedAt
    completedAt
    user {
      firstName
      lastName
      id
    }
    images {
      caption
      order
      image {
        hostedUrl
        id
        timeTaken
        imageTags
        publicId
      }
    }
    projectId
    project {
      name
    }
  }
`;
