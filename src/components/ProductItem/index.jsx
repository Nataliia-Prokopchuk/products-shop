import React from 'react';

import Cart from '../../assets/icons/cart.png';

import './style.scss';

class ProductItem extends React.PureComponent {
  render() {
    const {
      imageUrl,
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
          <div className="cart">
            <img src={Cart} alt="cart" />
          </div>
        ) : null}
        <div className="product-title">{productTitle}</div>
        <div className="product-price">{productPrice}</div>
      </div>
    );
  }
}

export default ProductItem;
