import { gql } from '@apollo/client';
import CommentFragment from './CommentFragment';
import ImageFragment from './ImageFragment';
import UserFragment from './UserFragment';

export default gql`
  fragment PostFragment on Post {
    id
    userId
    createdAt
    text
    projectExecutionId
    images {
      imageId
      caption
      order
      image {
        ...ImageFragment
      }
    }
    user {
      ...UserFragment
    }
    clapCount
    claps {
      userId
    }
    comments {
      ...CommentFragment
    }
  }
  ${CommentFragment}
  ${ImageFragment}
  ${UserFragment}
`;
