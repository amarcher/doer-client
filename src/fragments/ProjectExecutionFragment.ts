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
      image {
        hostedUrl
        id
        timeTaken
      }
    }
  }
`;
