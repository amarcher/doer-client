import { gql } from '@apollo/client';
import ProjectExecutionFragment from '../fragments/ProjectExecutionFragment';

export default gql`
  query GetProjectExecution($id: ID!) {
    projectExecution(id: $id) {
      ...ProjectExecutionFragment
    }
  }
  ${ProjectExecutionFragment}
`;
