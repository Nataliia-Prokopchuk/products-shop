import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import ProductListing from './pages/ProductListing';
import './App.scss';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
