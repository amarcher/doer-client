import { gql } from '@apollo/client';
import CommentFragment from '../fragments/CommentFragment';

export default gql`
  mutation CreateComment($text: String!, $userId: ID!, $postId: ID!) {
    createComment(text: $text, userId: $userId, postId: $postId) {
      ...CommentFragment
    }
  }
  ${CommentFragment}
`;
