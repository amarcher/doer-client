import { gql } from '@apollo/client';
import CategoryFragment from '../fragments/CategoryFragment';

interface Project {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
  projects: Project[]
}

export interface GetCategoryResponse {
  category: Category
} 

export default gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`;
