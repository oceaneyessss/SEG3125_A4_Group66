import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditAddress() {
  const navigate = useNavigate();

  // 1) State for all fields in one object
  const [form, setForm] = useState({
    name: '',
    email: '',
    billing: '',
    phone: '',
    country: '',
    zip: '',
    vat: ''
  });

  // 2) Load saved address on mount (if any)
  useEffect(() => {
    const saved = localStorage.getItem('address');
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  // 3) Generic change handler
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // 4) Cancel → go back to checkout without saving
  function handleCancel(e) {
    e.preventDefault();
    navigate('/checkout');
  }

  // 5) Save → write to localStorage and go back
  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem('address', JSON.stringify(form));
    navigate('/checkout');
  }

  return (
    <div className="container py-5">
      <h1>Edit Address</h1>
      <form
        onSubmit={handleSave}
        className="bg-white text-dark p-4"
        style={{
          border: '1px solid #ddd',
          borderRadius: '15px',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <div className="d-flex gap-3">
          <div className="mb-3 flex-fill">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-3 flex-fill">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="john@doe.com"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="billing" className="form-label">Billing Address</label>
          <textarea
            name="billing"
            id="billing"
            value={form.billing}
            onChange={handleChange}
            className="form-control"
            rows={2}
            placeholder="123 Main St"
          />
        </div>

        <div className="d-flex gap-3">
          <div className="mb-3 flex-fill">
            <label htmlFor="phone" className="form-label">Contact</label>
            <input
              name="phone"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="+44 0000 000000"
            />
          </div>
          <div className="mb-3 flex-fill">
            <label htmlFor="country" className="form-label">Country</label>
            <select
              name="country"
              id="country"
              className="form-select"
              value={form.country}
              onChange={handleChange}
            >
              <option value="" disabled>Select country</option>
              <option>Canada</option>
              <option>USA</option>
              <option>China</option>
              <option>England</option>
            </select>
          </div>
        </div>

        <div className="d-flex gap-3">
          <div className="mb-3 flex-fill">
            <label htmlFor="zip" className="form-label">ZIP Code</label>
            <input
              name="zip"
              id="zip"
              value={form.zip}
              onChange={handleChange}
              className="form-control"
              placeholder="000000"
            />
          </div>
          <div className="mb-3 flex-fill">
            <label htmlFor="vat" className="form-label">VAT Number</label>
            <input
              name="vat"
              id="vat"
              value={form.vat}
              onChange={handleChange}
              className="form-control"
              placeholder="000000"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
