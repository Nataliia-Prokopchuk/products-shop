import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { withRouter } from 'react-router-dom';

import productsQuery from '../../queries/products';
import ProductItem from '../../components/ProductItem';
import prepareUrlToTitle from '../../helpers';
import CurrencyContext from '../../context/CurrencyContext';

import './style.scss';

class ProductListing extends React.PureComponent {
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
                    imageUrl={product.productImageUrl}
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

const mapResultToProps = ({ data }) => (
  (!data.loading) ? {
    products: data.category.products.map((product) => ({
      id: product.id,
      productImageUrl: product.gallery[0],
      name: product.name,
      prices: product.prices,
      inStock: product.inStock,
    })),
  } : null
);

const mapPropsToOptions = (props) => ({
  variables: {
    categoryName: prepareUrlToTitle(props.location.pathname),
  },
});

export default withRouter(graphql(
  productsQuery,
  {
    props: mapResultToProps,
    options: mapPropsToOptions,
  },
)(ProductListing));