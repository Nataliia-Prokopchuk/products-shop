import { gql } from '@apollo/client';

export default gql(`
  query GetProducts($categoryName: String!) {
    category(input: { title: $categoryName}) {
      products 
      {
        gallery
        name
        brand
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
        inStock
        id
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    
    }
  }
`);
