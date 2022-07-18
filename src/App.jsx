import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import ProductDescription from './pages/ProductDescription';

import './App.scss';

class App extends React.PureComponent {
  render() {
    return (
      <CurrencyProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={ProductListing} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/:category" component={ProductListing} />
              <Route exact path="/product-description/:id" component={ProductDescription} />
            </Switch>
          </BrowserRouter>
        </CartProvider>
      </CurrencyProvider>
    );
  }
}

export default App;
