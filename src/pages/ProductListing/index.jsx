import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { withRouter } from 'react-router-dom';

import productsQuery from '../../queries/products';
import ProductItem from '../../components/ProductItem';
import prepareUrlToTitle from '../../helpers';
import CurrencyContext from '../../context/CurrencyContext';

import './style.scss';

class ProductListing extends React.PureComponent {
  navigateUrlProduct = (productId) => () => {
    const { history } = this.props;

    history.push(`/product-description/${productId}`);
  };

  render() {
    const { location, products = [] } = this.props;

    return (
      <div className="block-clothes">
        <div className="category">{prepareUrlToTitle(location.pathname)}</div>
        <div className="container-products">
          <CurrencyContext.Consumer>
            {({ currency }) => (
              products.map((product) => {
                const price = product.prices.find((p) => p.currency.label === currency.label);

                return (
                  <ProductItem
                    key={product.id}
                    navigateUrlProduct={this.navigateUrlProduct(product.id)}
                    imageUrl={product.gallery[0]}
                    productTitle={product.name}
                    productPrice={price ? `${price.currency.symbol} ${price.amount}` : ''}
                    inStock={product.inStock}
                  />
                );
              })
            )}
          </CurrencyContext.Consumer>
        </div>
      </div>
    );
  }
}

const mapResultToProps = ({ data }) => ({
  products: data.category?.products,
});

const mapPropsToOptions = (props) => ({
  variables: {
    categoryName: props.match.params.category || 'all',
  },
});

export default withRouter(graphql(
  productsQuery,
  {
    props: mapResultToProps,
    options: mapPropsToOptions,
  },
)(ProductListing));
