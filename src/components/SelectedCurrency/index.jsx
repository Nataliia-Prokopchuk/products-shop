import React from 'react';

import CurrencyContext from '../../context/CurrencyContext';

class SelectedCurrency extends React.PureComponent {
  render() {
    const { product } = this.props;

    return (
      <CurrencyContext.Consumer>
        {({ currency }) => (
          product.map((price) => (
            (price.currency.symbol === currency.symbol) ? (
              <div
                key={price.currency.symbol}
                className="price"
              >
                {`${price.currency.symbol} ${price.amount}`}
              </div>
            ) : null
          ))
        )}
      </CurrencyContext.Consumer>

    );
  }
}

export default SelectedCurrency;
