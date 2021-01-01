import { gql } from '@apollo/client';
import ProjectExecutionFragment from '../fragments/ProjectExecutionFragment';

export default gql`
  mutation CreateProjectExecution(
    $projectExecutionInput: CreateProjectExecutionInput!
    $imageUploadInputs: [ImageUploadInput]
  ) {
    createProjectExecution(
      projectExecutionInput: $projectExecutionInput
      imageUploadInputs: $imageUploadInputs
    ) {
      ...ProjectExecutionFragment
    }
  }
  ${ProjectExecutionFragment}
`;
