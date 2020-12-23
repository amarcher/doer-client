import { gql } from '@apollo/client';
import ProjectExecutionFragment from '../fragments/ProjectExecutionFragment';
import { ProjectExecution } from '../queries/GetProject';

export interface CreateProjectExecutionResult {
  createProjectExecution: ProjectExecution
}

export default gql`
  mutation CreateProjectExecution($projectExecutionInput: CreateProjectExecutionInput!) {
    createProjectExecution(projectExecutionInput: $projectExecutionInput) {
      ...ProjectExecutionFragment
    }
  }
  ${ProjectExecutionFragment}
`;
