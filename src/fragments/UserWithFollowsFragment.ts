import { gql } from '@apollo/client';
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
      id
      hostedUrl
      timeTaken
      publicId
    }
    followers {
      ...UserFragment
    }
    following {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
