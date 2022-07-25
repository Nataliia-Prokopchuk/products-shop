import React from 'react';

import AttributesProduct from '../AttributesProduct';
import SelectedCurrency from '../SelectedCurrency';
import MiniSlider from '../MiniSlider';

import './style.scss';

class CartProduct extends React.PureComponent {
  plusProductCount = () => {
    const { changeCartProducts, product } = this.props;

    changeCartProducts(product);
  };

  minusProductCount = () => {
    const { changeCartProducts, product } = this.props;

    changeCartProducts(product, false);
  };

  deleteProducts = () => {
    const { deleteProduct, product } = this.props;

    deleteProduct(product);
  };

  render() {
    const {
      product,
    } = this.props;

    return (
      <div className="product-cart">
        <div className="first-block">
          <div>
            <div className="brand">{product.brand}</div>
            <div className="title">{product.name}</div>
            <SelectedCurrency product={product.prices} />
            <AttributesProduct
              attributes={product.attributes}
              selectedAttributes={product.selectedAttributes}
            />
          </div>
          <div className="delete-product" onClick={this.deleteProducts}>Delete</div>
        </div>
        <div className="container-count-gallery">
          <div className="count-product">
            <div className="plus" onClick={this.plusProductCount}>+</div>
            <div className="count">{product.count}</div>
            <div className="minus" onClick={this.minusProductCount}>-</div>
          </div>
          <MiniSlider gallery={product.gallery} />
        </div>
      </div>
    );
  }
}

export default CartProduct;
