import React from 'react';
import { withRouter } from 'react-router-dom';

import Cart from '../../assets/icons/cart.png';
import CartContext from '../../context/CartContext';

import './style.scss';

class ProductItem extends React.PureComponent {
  addProductInCart = (changeCartProducts) => (e) => {
    const { product } = this.props;

    const withSelectedAttr = product.attributes.reduce((accum, attr) => (
      {
        ...accum,
        [attr.name]: attr.items[0].value,
      }
    ), {});

    changeCartProducts(
      {
        ...product,
        selectedAttributes: withSelectedAttr,
        count: 1,
      },
    );
    e.stopPropagation();
  };

  render() {
    const {
      product,
      productPrice,
      navigateUrlProduct,
    } = this.props;

    return (
      <div
        onClick={navigateUrlProduct}
        className="product"
      >
        {!product.inStock ? <div className="out-of-stock">Out of ctock</div> : null}
        <div className="product-image">
          <img src={product.gallery[0]} alt="product" />
        </div>
        {product.inStock ? (
          <CartContext.Consumer>
            {({ changeCartProducts }) => (
              <div className="cart" onClick={this.addProductInCart(changeCartProducts)}>
                <img src={Cart} alt="cart" />
              </div>
            )}
          </CartContext.Consumer>
        ) : null}
        <div className="product-title">{`${product.brand} ${product.name}`}</div>
        <div className="product-price">{productPrice}</div>
      </div>
    );
  }
}

export default withRouter(ProductItem);
