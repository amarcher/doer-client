import { gql } from '@apollo/client';
import PostFragment from './PostFragment';
import UserFragment from './UserFragment';

export default gql`
  fragment UserWithFollowsFragment on User {
    firstName
    lastName
    username
    email
    bio
    id
    profilePic {
      ...ImageFragment
    }
    followers {
      ...UserFragment
    }
    following {
      ...UserFragment
    }
    projectMasteries {
      projectId
      masteryLevel
    }
    categoryMasteries {
      categoryId
      masteryLevel
    }
    posts {
      ...PostFragment
    }
  }
  ${UserFragment}
  ${PostFragment}
`;
