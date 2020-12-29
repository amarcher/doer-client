import { gql } from '@apollo/client';

export default gql`
  fragment UserFragment on User {
    firstName
    lastName
    username
    email
    bio
    id
    profilePic {
      hostedUrl
    }
  }
`;
