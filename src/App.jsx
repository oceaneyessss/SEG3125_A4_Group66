// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home, { products } from './Home';
import SignIn from './Signin';
import Checkout from './Checkout';
import Feedback from './Feedback';
import ProductDetail from './ProductDetail';
import EditAddress  from './EditAddress';

export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<Home />} />
      <Route path="/signin"     element={<SignIn />} />
      <Route path="/checkout"   element={<Checkout />} />
      <Route path="/feedback"   element={<Feedback />} />
      <Route
        path="/product/:id"
        element={<ProductDetail products={products} />}
      />
      <Route path="/editAddress"   element={<EditAddress />} />
    </Routes>
  );
}

