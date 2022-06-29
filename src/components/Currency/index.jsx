import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { withRouter } from 'react-router-dom';
import currenciesQuery from '../../queries/currencies';

import './style.scss';

class Currency extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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

  updateCurrency = (ccy) => () => {
    const { changeCurrency } = this.props;

    changeCurrency(ccy);

    this.setState({
      focused: false,
    });
  };

  render() {
    const { focused } = this.state;
    const { currencies = [], currency } = this.props;

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
          <div>{currency.symbol}</div>
          <div className={`${focused ? 'icon' : 'down'}`}>^</div>
        </div>
        {
          focused ? (
            <div className="carrencies">
              {
                currencies.map((ccy) => (
                  (currency.symbol !== ccy.symbol) ? (
                    <div
                      key={ccy.symbol}
                      onClick={this.updateCurrency(ccy)}
                    >
                      {`${ccy.symbol} ${ccy.label}`}
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
