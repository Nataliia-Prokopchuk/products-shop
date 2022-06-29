import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link, withRouter } from 'react-router-dom';

import categoriesQuery from '../../queries/categories';
import CurrencyContext from '../../context/CurrencyContext';
import Currency from '../Currency';

import './style.scss';

class Header extends React.PureComponent {
  render() {
    const { categories = [], location } = this.props;

    return (
      <div className="container-header">
        <div className="container-categories">
          {
            categories.map((category) => {
              const categoryUrl = category.name === 'all'
                ? '/'
                : `/${category.name}`;

              return (
                <Link
                  key={category.name}
                  to={categoryUrl}
                  type="button"
                  className={`categories ${location.pathname === categoryUrl ? 'action' : ''}`}
                >
                  {category.name}
                </Link>
              );
            })
          }
        </div>

        <div>
          <CurrencyContext.Consumer>
            {({ currency, changeCurrency }) => (
              <Currency
                currency={currency}
                changeCurrency={changeCurrency}
              />
            )}
          </CurrencyContext.Consumer>

        </div>
      </div>
    );
  }
}

const mapResultToProps = ({ data }) => ({
  categories: data.categories,
  loading: data.loading,
});

export default withRouter(graphql(categoriesQuery, { props: mapResultToProps })(Header));
