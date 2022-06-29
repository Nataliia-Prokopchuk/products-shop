import { gql } from '@apollo/client';

export default gql(`
  query GetProducts($categoryName: String!) {
    category(input: { title: $categoryName}) {
      products 
      {
        gallery
        name
        inStock
        id
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    
    }
  }
`);
