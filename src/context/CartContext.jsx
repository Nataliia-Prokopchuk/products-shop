/* eslint-disable react/no-unused-state */
import React from 'react';
import { computeProductKey } from '../helpers';

export class CartProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.deleteProduct = (deleteProduct, cb = () => {}) => {
      const { cartProducts } = this.state;

      const deleteProductKey = computeProductKey(deleteProduct);

      const cartProductsCopy = { ...cartProducts };

      if (cartProductsCopy[deleteProductKey]) {
        delete cartProductsCopy[deleteProductKey];
      }

      localStorage.setItem('cartProducts', JSON.stringify(cartProductsCopy));

      this.setState({
        cartProducts: cartProductsCopy,
      }, cb);
    };

    this.calculateCountProducts = (prevNumber, isPlus) => {
      let number = prevNumber;

      if (isPlus) {
        number = prevNumber + 1;
      }

      if (prevNumber > 1 && !isPlus) {
        number = prevNumber - 1;
      }

      return number;
    };

    this.changeCartProducts = (product, isPlus = true) => {
      const { cartProducts } = this.state;

      const newProductKey = computeProductKey(product);

      const prepareProducts = (cartProducts[newProductKey]) ? {
        ...cartProducts,
        [newProductKey]: {
          ...product,
          count: this.calculateCountProducts(cartProducts[newProductKey].count, isPlus),
        },
      } : {
        ...cartProducts,
        [newProductKey]: product,
      };

      this.setState({
        cartProducts: prepareProducts,
      });

      localStorage.setItem('cartProducts', JSON.stringify(prepareProducts));
    };

    this.state = {
      cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || {},
      changeCartProducts: this.changeCartProducts,
      deleteProduct: this.deleteProduct,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <CartContext.Provider value={this.state}>
        {children}
      </CartContext.Provider>
    );
  }
}

const CartContext = React.createContext();

export default CartContext;
