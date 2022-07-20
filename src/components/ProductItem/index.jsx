import React from 'react';
import { withRouter } from 'react-router-dom';

import Cart from '../../assets/icons/cart.png';
import CartContext from '../../context/CartContext';

import './style.scss';

class ProductItem extends React.PureComponent {
  addProductInCart = (changeCartProducts, product) => (e) => {
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
      imageUrl,
      product,
      productTitle,
      productPrice,
      inStock,
      navigateUrlProduct,
    } = this.props;

    return (
      <div
        onClick={navigateUrlProduct}
        className="product"
      >
        {!inStock ? <div className="out-of-stock">Out of ctock</div> : null}
        <div className="product-image">
          <img src={imageUrl} alt="product" />
        </div>
        {inStock ? (
          <CartContext.Consumer>
            {({
              changeCartProducts,
            }) => (
              <div className="cart" onClick={this.addProductInCart(changeCartProducts, product)}>
                <img src={Cart} alt="cart" />
              </div>
            )}
          </CartContext.Consumer>
        ) : null}
        <div className="product-title">{productTitle}</div>
        <div className="product-price">{productPrice}</div>
      </div>
    );
  }
}

export default withRouter(ProductItem);
