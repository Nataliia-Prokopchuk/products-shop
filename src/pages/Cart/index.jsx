import React from 'react';
import { withRouter } from 'react-router-dom';

import CartProduct from '../../components/CartProduct';
import CartContext from '../../context/CartContext';
import Results from '../../components/Result';
import { computeSumCountProducts } from '../../helpers';

import './style.scss';

class Cart extends React.PureComponent {
  render() {
    return (
      <div className="container-cart">
        <div className="cart">Cart</div>
        <CartContext.Consumer>
          {({
            cartProducts,
            changeCartProducts,
            deleteProduct,
          }) => (
            (computeSumCountProducts(cartProducts)) ? (
              <>
                {
                  Object.keys(cartProducts).sort().map((k) => (
                    <CartProduct
                      key={k}
                      product={cartProducts[k]}
                      changeCartProducts={changeCartProducts}
                      deleteProduct={deleteProduct}
                    />
                  ))
                }
                <Results
                  cartProducts={cartProducts}
                  isMiniCart={false}
                />
              </>
            ) : (
              <div className="empty-cart">Your cart is empty</div>
            )
          )}
        </CartContext.Consumer>
      </div>
    );
  }
}

export default withRouter(Cart);
