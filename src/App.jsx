import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import ProductListing from './pages/ProductListing';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ProductListing} />
        <Route exact path="/clothes" component={ProductListing} />
        <Route exact path="/tech" component={ProductListing} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
