import { gql } from '@apollo/client';
import CategoryFragment from '../fragments/CategoryFragment';

export default gql`
  query GetCategories {
    categories {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`;
