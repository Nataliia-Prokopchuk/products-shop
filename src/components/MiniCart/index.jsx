import React from 'react';
import { withRouter } from 'react-router-dom';

import Cart from '../../assets/icons/cartHeader.svg';
import CartContext from '../../context/CartContext';
import { computeSumCountProducts } from '../../helpers';
import MiniCartView from '../MiniCartView';

import './style.scss';

class MiniCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (prevProps.location.pathname !== location.pathname) {
      this.closeDropdown();
    }
  }

  openDropdown = () => {
    const { location } = this.props;

    if (location.pathname !== '/cart') {
      this.setState({
        focused: true,
      });
    }
  };

  closeDropdown = () => {
    this.setState({
      focused: false,
    });
  };

  renderMiniCart = (cartProducts) => {
    const { focused } = this.state;
    const count = computeSumCountProducts(cartProducts);

    return (
      <>
        <div
          className="mini-cart"
          onClick={this.openDropdown}
        >
          <img src={Cart} alt="cart" />
          {count ? <div className="count-header">{count}</div> : null}
          {focused ? <MiniCartView count={count} /> : null}
        </div>
        {focused ? (
          <>
            <div className="fade fade-black" onClick={this.closeDropdown} />
            <div className="fade fade-transparent" onClick={this.closeDropdown} />
          </>
        ) : null}
      </>
    );
  };

  render() {
    return (
      <CartContext.Consumer>
        {({ cartProducts }) => (
          this.renderMiniCart(cartProducts)
        )}
      </CartContext.Consumer>
    );
  }
}

export default withRouter(MiniCart);
