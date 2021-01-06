import { gql } from '@apollo/client';
import PostFragment from '../fragments/PostFragment';

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
    posts {
      ...PostFragment
    }
    projectId
    project {
      name
    }
  }
  ${PostFragment}
`;
