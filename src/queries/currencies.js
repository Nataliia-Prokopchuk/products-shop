import { gql } from '@apollo/client';

export default gql(`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`);
