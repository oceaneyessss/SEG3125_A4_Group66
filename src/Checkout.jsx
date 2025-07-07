import React, { useState, useEffect } from 'react';
import { ArrowLeft, GeoAlt, PencilSquare, Trash } from 'react-bootstrap-icons';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    email: '',
    billing: '',
    phone: '',
    country: '',
    zip: '',
    vat: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));

    const savedAddress = localStorage.getItem('address');
    if (savedAddress) setAddress(JSON.parse(savedAddress));
  }, []);

  // Helpers to sync state + localStorage
  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function handleQuantityChange(id, qty) {
    const next = cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    updateCart(next);
  }

  function handleRemove(id) {
    const next = cart.filter(item => item.id !== id);
    updateCart(next);
  }

  function clearCart() {
    updateCart([]);
    // <div className="d-flex align-items-center mb-2"></div>
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-warning mb-3">
        <ArrowLeft className="me-1" /> Continue Shopping
      </Link>

      <div className="d-flex align-items-center mb-2">
        <GeoAlt className="text-danger me-2" size={20} />
        <div className="flex-grow-1">
          <div>
            {address.billing
              ? address.billing + (address.country ? ', ' + address.country : '')
              : '75 Laurier Ave E, Ottawa, ON K1N 6N5'}
          </div>
          <div>
            {address.name
              ? address.name + (address.phone ? ', ' + address.phone : '')
              : 'John Wick, 613-xxx-xxxx'}
          </div>
        </div>
        <Link to="/editAddress" className="btn btn-warning mb-3">
          <button className="btn btn-dark btn-sm">
            <PencilSquare />
          </button>
        </Link>
      </div>
      <hr />

      <h4>Shopping cart</h4>
      <p>You have {cart.length} item{cart.length !== 1 && 's'} in your cart</p>

{cart.map(item => (
  <div
    key={item.id}
    className="card mb-3 p-3 shadow-sm"
    
  >
    <div className="row g-0 align-items-center">
      <div className="col-auto">
        <img
          src={item.image}
          alt={item.title}
          className="img-fluid rounded"
          style={{ width: 100, height: 100, objectFit: 'cover' }}
        />
      </div>
      <div className="col ms-3">
        <h5>{item.title}</h5>
        <p className="mb-1">
          <small>Size: {item.size}, Color: {item.color}</small>
        </p>
      </div>
      <div className="col-auto d-flex align-items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
          className="form-control form-control-sm text-center"
          style={{ width: 60 }}
        />
      </div>
      <div className="col-auto ms-3">
        <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <div className="col-auto ms-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => handleRemove(item.id)}
        >
          <Trash />
        </button>
      </div>
    </div>
  </div>
))}


      <div className="row mt-4">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div
            className="card p-4 text-white"
            style={{ backgroundColor: '#5A47AB', borderRadius: '1rem' }}
          >
            <h5 className="mb-4">Payment Summary</h5>

            <div className="d-flex gap-3 mb-4">
              <FaCcVisa size={40} />
              <FaCcMastercard size={40} />
            </div>

            <form className="mb-3">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cardholder Name"
                  style={{ fontSize: 15, width: '50%'  }}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Card Number"
                  maxLength={19}
                  style={{ fontSize: 15, width: '100%'  }}
                  required
                  pattern="[0-9\s]{13,19}"
                  inputMode="numeric"
                />
              </div>
              <div className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  maxLength={5}
                  style={{ fontSize: 15, width: "50%" }}
                  required
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="CVV"
                  maxLength={4}
                  style={{ fontSize: 15, width: "50%" }}
                  required
                  pattern="[0-9]{3,4}"
                  inputMode="numeric"
                />
              </div>
            </form>

            <div className="d-flex justify-content-between mb-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span>
              <span>${(subtotal + shipping).toFixed(2)}</span>
            </div>

            <Link to="/feedback" className="text-decoration-none">
              <button className="btn btn-warning w-100">Checkout →</button>
            </Link>
            <button
              className="btn btn-outline-light w-100 mt-2"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

