import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link, withRouter } from 'react-router-dom';

import categoriesQuery from '../../queries/categories';
import Brand from '../../assets/icons/brand.svg';
import Currency from '../Currency';
import MiniCart from '../MiniCart';

import './style.scss';

class Header extends React.PureComponent {
  openMainPage = () => {
    const { history } = this.props;

    history.push('/');
  };

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
        <div className="brand-header" onClick={this.openMainPage}>
          <img src={Brand} alt="brand" />
        </div>
        <div className="container-currency-cart">
          <Currency />
          <MiniCart />
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
