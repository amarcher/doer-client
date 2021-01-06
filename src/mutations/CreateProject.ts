import { gql } from '@apollo/client';
import ProjectFragment from '../fragments/ProjectFragment';

export default gql`
  mutation CreateProject($name: String!, $categoryId: ID!) {
    createProject(name: $name, categoryId: $categoryId) {
      ...ProjectFragment
    }
  }
  ${ProjectFragment}
`;
