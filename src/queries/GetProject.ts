import { gql } from '@apollo/client';
import ProjectFragment from '../fragments/ProjectFragment';

interface Image {
  id: number
  s3Location: string
  timeTaken: string
}

export interface ProjectExecutionImage {
  id: number
  caption: string
  image: Image
}

interface User {
  firstName: string
  lastName: string
  id: number
}

export interface ProjectExecution {
  title: string
  user: User
  images: ProjectExecutionImage[]
  id: number
  startedAt: string | null
  completedAt: string | null
}

interface Project {
  id: number
  name: string
  projectExecutions: ProjectExecution[]
}

export interface GetProjectResponse {
  project: Project
};

export default gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      ...ProjectFragment
    }
  }
  ${ProjectFragment}
`;
