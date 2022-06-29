import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { withRouter } from 'react-router-dom';

import productsQuery from '../../queries/products';
import ProductItem from '../../components/ProductItem';
import prepareUrlToTitle from '../../helpers';

import './style.scss';

class ProductListing extends React.PureComponent {
  render() {
    const { location, products = [] } = this.props;

    return (
      <div className="block-clothes">
        <div className="category">{prepareUrlToTitle(location.pathname)}</div>
        <div className="container-products">
          {
            products.map((product) => (
              <ProductItem
                key={product.id}
                imageUrl={product.productImageUrl}
                productTitle={product.name}
                productPrice={product.price}
                inStock={product.inStock}
              />
            ))
          }
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
      price: `${product.prices[0].currency.symbol} ${product.prices[0].amount}`,
      inStock: product.inStock,
    })),
  } : null
);

export default withRouter(graphql(
  productsQuery,
  {
    props: mapResultToProps,
    options: (props) => ({
      variables: {
        categoryName: prepareUrlToTitle(props.location.pathname),
      },
    }),
  },
)(ProductListing));
