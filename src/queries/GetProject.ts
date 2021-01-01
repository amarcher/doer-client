import { gql } from '@apollo/client';
import ProjectFragment from '../fragments/ProjectFragment';

export default gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      ...ProjectFragment
    }
  }
  ${ProjectFragment}
`;
