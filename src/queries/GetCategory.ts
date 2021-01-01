import { gql } from '@apollo/client';
import CategoryFragment from '../fragments/CategoryFragment';

export default gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`;
