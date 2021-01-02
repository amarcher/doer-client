import { gql } from '@apollo/client';
import ProjectExecutionFragment from '../fragments/ProjectExecutionFragment';

export default gql`
  mutation UpdateProjectExecution(
    $id: ID!
    $title: String
    $completedAt: Date
  ) {
    updateProjectExecution(id: $id, title: $title, completedAt: $completedAt) {
      ...ProjectExecutionFragment
    }
  }
  ${ProjectExecutionFragment}
`;
