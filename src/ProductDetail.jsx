import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { products }  from './Home';

export default function ProductDetail() {
  const { id }        = useParams();
  const product       = products.find(p => String(p.id) === id);
  const navigate      = useNavigate();

  const [size, setSize]         = useState('M');
  const [color, setColor]       = useState('White');
  const [quantity, setQuantity] = useState(1);

  const images = product?.images || [product?.image];
  const [mainImg, setMainImg] = useState(images[0]);

  if (!product) {
    return (
      <div className="container py-5">
        <p>Product not found.</p>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft className="me-1" /> Back to Products
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    const stored = localStorage.getItem('cart');
    const cart = stored ? JSON.parse(stored) : [];
    cart.push({
      id:       product.id,
      title:    product.title,
      price:    product.price,
      image:    mainImg,
      size,
      color,
      quantity
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/');
  }

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-4">
        <ArrowLeft className="me-1" /> Back to Products
      </Link>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="text-center mb-3">
            <img
              src={mainImg}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: 400 }}
            />
            <div className="d-flex justify-content-center gap-2 mt-3">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`option-${idx + 1}`}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    border: mainImg === img ? '2px solid #007bff' : '2px solid #eee',
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: '#fff',
                  }}
                  onClick={() => setMainImg(img)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex align-items-baseline mb-3">
            <span className="fs-3 fw-bold me-3">${product.price}</span>
            <small className="text-muted text-decoration-line-through">
              ${product.originalPrice}
            </small>
            <small className="text-danger ms-2">
              ({product.discount} OFF)
            </small>
          </div>

          <div className="d-flex gap-3 mb-4">
            <div>
              <label htmlFor="size" className="form-label">Size</label>
              <select
                id="size"
                className="form-select"
                value={size}
                onChange={e => setSize(e.target.value)}
              >
                <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
              </select>
            </div>
            <div>
              <label htmlFor="color" className="form-label">Color</label>
              <select
                id="color"
                className="form-select"
                value={color}
                onChange={e => setColor(e.target.value)}
              >
                <option>White</option><option>Black</option><option>Gray</option><option>Dark Green</option><option>Navy Blue</option>
              </select>
            </div>
            <div>
              <label htmlFor="qty" className="form-label">Quantity</label>
              <input
                type="number"
                id="qty"
                min="1"
                value={quantity}
                className="form-control"
                style={{ width: '80px' }}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-2">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <span className="text-secondary" style={{ fontSize: "14px" }}>
              In Stock: {product.inStock ?? 10}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

