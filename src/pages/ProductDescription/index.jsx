import React from 'react';

import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';

import productQuery from '../../queries/product';
import CurrencyContext from '../../context/CurrencyContext';
import CartContext from '../../context/CartContext';
import AttributesProduct from '../../components/AttributesProduct';
import GalerrySlider from '../../components/GalerrySlider';
import ActionButton from '../../components/ActionButton';

import './style.scss';

class ProductDescription extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedPhoto: props.gallery ? props.gallery[0] : '',
      selectedAttributes: {},
      isValid: false,
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

  chooseAttributes = (key, value) => () => {
    const { selectedAttributes } = this.state;
    this.setState({
      selectedAttributes: { ...selectedAttributes, [key]: value },
    });
  };

  addInCart = (changeCartProducts) => () => {
    const { selectedAttributes } = this.state;
    const {
      gallery = [],
      name,
      id,
      brand,
      attributes = [],
      prices = [],
    } = this.props;

    if (Object.keys(selectedAttributes).length === attributes.length) {
      this.setState({
        isValid: false,
      });
      changeCartProducts({
        gallery,
        name,
        id,
        count: 1,
        brand,
        attributes,
        prices,
        selectedAttributes,
      });
    } else {
      this.setState({
        isValid: true,
      });
    }
  };

  render() {
    const {
      selectedPhoto,
      selectedAttributes,
      isValid,
    } = this.state;

    const {
      gallery = [],
      name,
      brand,
      attributes = [],
      prices = [],
      description,
      inStock,
    } = this.props;

    return (
      <div>
        <div className="product-block">
          <GalerrySlider
            gallery={gallery}
            selectedPhoto={selectedPhoto}
            choosePhoto={this.choosePhoto}
          />
          <div className="description">
            <div className="title">
              {name}
            </div>
            <div className="brand">
              {brand}
            </div>
            <AttributesProduct
              attributes={attributes}
              chooseAttributes={this.chooseAttributes}
              selectedAttributes={selectedAttributes}
            />
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
            <CartContext.Consumer>
              {({ changeCartProducts }) => (
                <ActionButton
                  title={inStock ? 'Add to cart' : 'Out of stock'}
                  isDisabled={!inStock}
                  addInCart={this.addInCart(changeCartProducts)}
                />
              )}
            </CartContext.Consumer>
            {
              isValid ? <div className="validation"> Please, select attributes!</div> : null
            }
            <div
              className="description-text"
            // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapResultToProps = ({ data }) => data.product;

const mapPropsToOptions = (props) => ({
  variables: {
    productId: props.match.params.id,
  },
  fetchPolicy: 'network-only',
});

export default withRouter(graphql(
  productQuery,
  {
    props: mapResultToProps,
    options: mapPropsToOptions,
  },
)(ProductDescription));
