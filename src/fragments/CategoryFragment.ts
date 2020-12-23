import { gql } from '@apollo/client';

export default gql`
  fragment CategoryFragment on Category {
    id
    name
    projects {
      id
      name
    }
  }
`;
