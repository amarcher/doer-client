import { gql } from '@apollo/client';
import CategoryFragment from '../fragments/CategoryFragment';

export default gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`;
