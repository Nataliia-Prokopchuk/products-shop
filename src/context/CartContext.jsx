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

      const prepareProducts = (cartProducts[newProductId]) ? ({
        ...cartProducts,
        [newProductId]: {
          ...product,
          count: cartProducts[newProductId].count + 1,
        },
      }) : (
        {
          ...cartProducts,
          [newProductId]: { ...product },
        }
      );

      this.setState({
        cartProducts: prepareProducts,
      });

      localStorage.setItem('cartProducts', JSON.stringify(prepareProducts));
    };

    this.state = {
      cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || {},
      changeCartProducts: this.changeCartProducts,
    };
  }

  render() {
    const { cartProducts } = this.state;
    const { children } = this.props;
    console.log(cartProducts);

    return (
      <CartContext.Provider value={this.state}>
        {children}
      </CartContext.Provider>
    );
  }
}

const CartContext = React.createContext();

export default CartContext;
