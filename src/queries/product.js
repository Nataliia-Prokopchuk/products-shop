import { gql } from '@apollo/client';

export default gql(`
  query GetProduct($productId: String!) {
    product (id: $productId) {
      gallery
      name
      id
      description
      brand
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
    }
  }
`);
