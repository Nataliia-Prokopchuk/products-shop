import React from 'react';
import ActionButton from '../ActionButton';
import CurrencyContext from '../../context/CurrencyContext';

import { computeSumPriceProducts, computeSumCountProducts } from '../../helpers';

import './style.scss';

class Results extends React.PureComponent {
  renderResult = (currency) => {
    const { cartProducts, isMiniCart } = this.props;

    const productsSum = computeSumPriceProducts(
      Object.keys(cartProducts).map((key) => ({
        count: cartProducts[key].count,
        ...cartProducts[key].prices.find((price) => (
          price.currency.symbol === currency.symbol
        )),
      })),
    );

    return (
      <div className="compute-price">
        <div className="information">
          {
            isMiniCart ? null : (
              <>
                <div className="title">Tax 21%:</div>
                <div className="value">{`${currency.symbol}${(productsSum * 0.21).toFixed(2)}`}</div>
                <div className="title">Quantity:</div>
                <div className="value">{`${computeSumCountProducts(cartProducts)}`}</div>
              </>
            )
          }
          <div className="title total">Total:</div>
          <div className="value">{`${currency.symbol} ${productsSum.toFixed(2)}`}</div>
        </div>
        {
          isMiniCart ? null : (
            <ActionButton
              title="Order"
            />
          )
        }
      </div>

    );
  };

  render() {
    return (
      <CurrencyContext.Consumer>
        {({ currency }) => (
          this.renderResult(currency)
        )}
      </CurrencyContext.Consumer>
    );
  }
}

export default Results;
