import { gql } from '@apollo/client';
import UserFragment from './UserFragment';

export default gql`
  fragment CommentFragment on Comment {
    id
    createdAt
    text
    postId
    userId
    user {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
