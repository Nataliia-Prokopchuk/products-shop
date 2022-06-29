import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { withRouter } from 'react-router-dom';
import currenciesQuery from '../../queries/currencies';

import './style.scss';

class Currency extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentSymbol: '$',
      focused: false,
    };
  }

  openDropdown = () => {
    this.setState({
      focused: true,
    });
  };

  closeDropdown = () => {
    this.setState({
      focused: false,
    });
  };

  changeCurrency = (symbol) => () => {
    this.setState({
      currentSymbol: symbol,
    });

    this.setState({
      focused: false,
    });
  };

  render() {
    const { currentSymbol, focused } = this.state;
    const { currencies = [] } = this.props;

    return (
      <div
        tabIndex="0"
        onFocus={this.openDropdown}
        onBlur={this.closeDropdown}
        className="container-currency"
      >
        <div
          className="currency"
          onClick={this.openDropdown}
        >
          <div>{currentSymbol}</div>
          <div className={`${focused ? 'icon' : 'down'}`}>^</div>
        </div>
        {
          focused ? (
            <div className="carrencies">
              {
                currencies.map((currency) => (
                  (currentSymbol !== currency.symbol) ? (
                    <div onClick={this.changeCurrency(currency.symbol)}>
                      {`${currency.symbol} ${currency.label}`}
                    </div>
                  ) : null
                ))
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}

const mapResultToProps = ({ data }) => ({
  currencies: data.currencies,
});

export default withRouter(graphql(currenciesQuery, { props: mapResultToProps })(Currency));
