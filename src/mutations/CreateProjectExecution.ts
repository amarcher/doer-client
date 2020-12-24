import { gql } from '@apollo/client';
import ProjectExecutionFragment from '../fragments/ProjectExecutionFragment';
import { ProjectExecution } from '../queries/GetProject';

export interface CreateProjectExecutionResult {
  createProjectExecution: ProjectExecution
}

export default gql`
  mutation CreateProjectExecution($projectExecutionInput: CreateProjectExecutionInput!, $imageUploadInputs: [ImageUploadInput]) {
    createProjectExecution(projectExecutionInput: $projectExecutionInput, imageUploadInputs: $imageUploadInputs) {
      ...ProjectExecutionFragment
    }
  }
  ${ProjectExecutionFragment}
`;
