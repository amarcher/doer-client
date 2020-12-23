import { gql } from '@apollo/client';
import ProjectExecutionFragment from './ProjectExecutionFragment';

export default gql`
  fragment ProjectFragment on Project {
    id
    name
    projectExecutions {
      ...ProjectExecutionFragment
    }
  }
  ${ProjectExecutionFragment}
`;
