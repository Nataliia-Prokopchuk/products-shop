/* eslint-disable react/no-unused-state */
import React from 'react';

export class CartProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeCartProducts = (product) => {
      const { cartProducts } = this.state;

      const newProductId = Object.keys(product.selectedAttributes).reduce(
        (accum, current) => `${accum}-${product.selectedAttributes[current]}`,
        product.id,
      );

      if (cartProducts[newProductId]) {
        this.setState({
          cartProducts: {
            ...cartProducts,
            [newProductId]: {
              ...product,
              count: cartProducts[newProductId].count + 1,
            },
          },
        });
      } else {
        this.setState({
          cartProducts: {
            ...cartProducts,
            [newProductId]: { ...product },
          },
        });
      }
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
