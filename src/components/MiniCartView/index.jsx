import React from 'react';
import { withRouter } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { computeSumCountProducts } from '../../helpers';
import ActionButton from '../ActionButton';
import CartProduct from '../CartProduct';
import Results from '../Result';
import './style.scss';

class MiniCartView extends React.PureComponent {
  openCart = () => {
    const { history } = this.props;

    history.push('/cart');
  };

  render() {
    const { count } = this.props;

    return (
      <div className="mini-cart-view">
        <div className="bag">
          <b>My Bag,</b>
          {` ${count} items`}
        </div>
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
                  isMiniCart
                />
              </>
            ) : (
              <div className="empty-cart">Your cart is empty</div>
            )
          )}
        </CartContext.Consumer>
        <div className="buttons">
          <ActionButton
            className="view"
            title="view"
            onClick={this.openCart}
          />
          <ActionButton title="check out" />
        </div>
      </div>

    );
  }
}

export default withRouter(MiniCartView);
