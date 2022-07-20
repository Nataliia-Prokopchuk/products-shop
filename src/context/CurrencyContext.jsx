/* eslint-disable react/no-unused-state */
import React from 'react';

export class CurrencyProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeCurrency = (currency) => {
      this.setState({
        currency,
      });

      localStorage.setItem('currency', JSON.stringify(currency));
    };

    this.state = {
      currency: JSON.parse(localStorage.getItem('currency')) || {
        symbol: '$',
        label: 'USD',
      },
      changeCurrency: this.changeCurrency,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <CurrencyContext.Provider value={this.state}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

const CurrencyContext = React.createContext();

export default CurrencyContext;
