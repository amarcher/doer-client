import { gql } from '@apollo/client';
import CategoryFragment from '../fragments/CategoryFragment';
import { Category } from './GetCategory';

export interface GetCategoriesResponse {
  categories: Category[]
} 

export default gql`
  query GetCategories {
    categories {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`;
