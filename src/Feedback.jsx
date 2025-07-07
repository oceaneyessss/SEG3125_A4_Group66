import React, {useState} from 'react';
import { Link } from 'react-router-dom';


function StarRating({ totalStars = 5, onChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex">
      {Array.from({ length: totalStars }, (_, i) => {
        const starValue = i + 1;
        const isGold = starValue <= (hover || rating);
        return (
          <span
            key={i}
            className="me-1"
            style={{
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: isGold ? '#FFD700' : '#CCC'
            }}
            onClick={() => {
              setRating(starValue);
              onChange?.(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function Feedback() {
    const [stars, setStars] = useState(0);

    const handleSubmit = e => {
        e.preventDefault();
        console.log({stars});
    };
  return (
    <div className='justify-content-center' style={{background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 50%, #f0fcd1 100%)", minHeight: "100vh", padding: "2rem"}}>
      <div className='d-flex justify-content-center align-item-center'>
        <p className="fs-3 fw-bold text-dark mb-4">
            Hi there! We'd love to hear about your shopping experience
        </p>
      </div>
      

      <form
        className="bg-white text-dark p-4"
        style={{
          border: "1px solid #ddd",
          borderRadius: "15px",
          maxWidth: "500px",
          margin: "0 auto"
        }}
      >
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name</label>
          <input type="text" id="Name" name="Name" className="form-control" placeholder="Enter your name"/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email" id="email" name="email" className="form-control" placeholder="Enter your email"/>
        </div>

        <div className="mb-3">
          <label className="form-label">Share your experience in scaling</label>
          <StarRating totalStars={5} onChange={setStars} />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="form-label visually-hidden">Comments</label>
          <textarea id="content" name="content" rows="5" className="form-control" placeholder="Add your comments…" required/>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="reset" className="btn btn-outline-secondary">
            Cancel
          </button>
          <Link to="/" className='text-success text-decoration-none'>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
          </Link>
          
        </div>
      </form>
    </div>
  );
}
