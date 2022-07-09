/* eslint-disable react/no-unused-state */
import React from 'react';

export class CartProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeCartProducts = (product) => {
      const { cartProducts } = this.state;
      this.setState({
        cartProducts: {
          ...cartProducts,
          product,
        },
      });
    };

    this.state = {
      cartProducts: {},
      changeCartProducts: this.changeCartProducts,
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
