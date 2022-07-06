import React from 'react';

import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import productQuery from '../../queries/product';
import CurrencyContext from '../../context/CurrencyContext';
import GalerrySlider from '../../components/GalerrySlider';
import AttributesProduct from '../../components/AttributesProduct';
import ActionButton from '../../components/ActionButton';

import './style.scss';

class ProductDescription extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPhoto: props.gallery ? props.gallery[0] : '',
    };
  }

  componentDidUpdate(prevProps) {
    const { gallery } = this.props;

    if (!prevProps.gallery && gallery) {
      this.setState({
        selectedPhoto: gallery[0],
      });
    }
  }

  choosePhoto = (imageURL) => () => {
    this.setState({
      selectedPhoto: imageURL,
    });
  };

  render() {
    const { selectedPhoto } = this.state;
    const {
      gallery = [],
      product = {},
      attributes,
      prices,
      description,
      inStock,
      loading,
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <div className="product-block">
        <GalerrySlider
          gallery={gallery}
          selectedPhoto={selectedPhoto}
          choosePhoto={this.choosePhoto}
        />
        <div className="description">
          <div className="title">
            {product.name}
          </div>
          <div className="brand">
            {product.brand}
          </div>
          <AttributesProduct attributes={attributes} />
          <div className="block-price">
            <div className="title">Price:</div>
            <CurrencyContext.Consumer>
              {({ currency }) => (
                prices.map((price) => (
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
          </div>
          <ActionButton
            title={inStock ? 'Add to cart' : 'Out of stock'}
            isDisabled={!inStock}
          />
          <div
            className="description-text"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    );
  }
}

const mapResultToProps = ({ data }) => (
  (!data.loading) ? {
    product: data.product,
    gallery: data.product.gallery,
    attributes: data.product.attributes,
    prices: data.product.prices,
    description: data.product.description,
    inStock: data.product.inStock,
    loading: data.loading,
  } : {
    loading: data.loading,
  }
);

const mapPropsToOptions = (props) => ({
  variables: {
    productId: props.match.params.id,
  },
});

export default withRouter(graphql(
  productQuery,
  {
    props: mapResultToProps,
    options: mapPropsToOptions,
  },
)(ProductDescription));
