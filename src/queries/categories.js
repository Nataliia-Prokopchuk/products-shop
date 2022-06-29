import { gql } from '@apollo/client';

export default gql(`
  query GetCategories {
    categories {
      name
    }
  }
`);
