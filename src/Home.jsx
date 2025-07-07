import { useState } from 'react';
import logo from "./assets/Main.jpg";
import maleTshirt_black from "./assets/maleTshirt_black.png";
import maleTshirt_gray from "./assets/maleTshirt_gray.png";
import maleTshirt_green from "./assets/maleTshirt_green.png";

import femaleTshirt_black from "./assets/femaleTshirt_black.png";
import femaleTshirt_white from "./assets/femaleTshirt_white.png";

import maleCoat_black from "./assets/maleCoat_black.png";
import maleCoat_green from "./assets/maleCoat_green.png";

import femaleCoat_pink from "./assets/femaleCoat_pink.png";
import femaleCoat_white from "./assets/femaleCoat_white.png";

import maleShorts_black from "./assets/maleShorts_black.png";
import maleShorts_gray from "./assets/maleShorts_gray.png";
import maleShorts_white from "./assets/maleShorts_white.png";

import femaleShorts_black from "./assets/femaleShorts_black.png";
import femaleShorts_white from "./assets/femaleShorts_white.png";

import malePants_black from "./assets/malePants_black.png";
import malePants_gray from "./assets/malePants_gray.png";

import femalePants_blue from "./assets/femalePants_blue.png";
import femalePants_yellow from "./assets/femalePants_yellow.png";

import { Link } from 'react-router-dom';

import { Search, Cart, Truck, Headset, CurrencyDollar } from 'react-bootstrap-icons';

export const products = [
  {
    id: 1,
    title: "Men's T-Shirt",
    description: "Lightly Washed Slim Fit Men's T-Shirt",
    price: 59.9,
    originalPrice: 118.9,
    discount: '50%',
    image: maleTshirt_black,
    images: [maleTshirt_black, maleTshirt_gray, maleTshirt_green],
    tags: ["male", "t-shirt"],
    inStock: 10,
  },
  {
    id: 2,
    title: "Women's T-Shirt",
    description: "Lightly Washed Slim Fit Women's T-Shirt",
    price: 59.9,
    originalPrice: 118.9,
    discount: '50%',
    image: femaleTshirt_white,
    images: [femaleTshirt_white, femaleTshirt_black],
    tags: ["female", "t-shirt"],
    inStock: 10,
  },
  {
    id: 3,
    title: "Men's Coat",
    description: "Lightly Washed Slim Fit Men's Coat",
    price: 89.9,
    originalPrice: 179.9,
    discount: '50%',
    image: maleCoat_black,
    images: [maleCoat_black, maleCoat_green],
    tags: ["male", "coat"],
    inStock: 10,
  },
  {
    id: 4,
    title: "Women's Coat",
    description: "Lightly Washed Slim Fit Women's Coat",
    price: 89.9,
    originalPrice: 179.9,
    discount: '50%',
    image: femaleCoat_pink,
    images: [femaleCoat_pink, femaleCoat_white],
    tags: ["female", "coat"],
    inStock: 10,
  },
  {
    id: 5,
    title: "Men's Shorts",
    description: "Lightly Washed Slim Fit Men's Shorts",
    price: 49.9,
    originalPrice: 99.9,
    discount: '50%',
    image: maleShorts_black,
    images: [maleShorts_black, maleShorts_gray, maleShorts_white],
    tags: ["male", "shorts"],
    inStock: 10,
  },
  {
    id: 6,
    title: "Women's Shorts",
    description: "Lightly Washed Slim Fit Women's Shorts",
    price: 49.9,
    originalPrice: 99.9,
    discount: '50%',
    image: femaleShorts_black,
    images: [femaleShorts_black, femaleShorts_white],
    tags: ["female", "shorts"],
    inStock: 10,
  },
  {
    id: 7,
    title: "Men's Pants",
    description: "Lightly Washed Slim Fit Men's Pants",
    price: 99.9,
    originalPrice: 199.9,
    discount: '50%',
    image: malePants_black,
    images: [malePants_black, malePants_gray],
    tags: ["male", "pants"],
    inStock: 10,
  },
  {
    id: 8,
    title: "Women's Pants",
    description: "Lightly Washed Slim Fit Women's Pants",
    price: 99.9,
    originalPrice: 199.9,
    discount: '50%',
    image: femalePants_blue,
    images: [femalePants_blue, femalePants_yellow],
    tags: ["female", "pants"],
    inStock: 10,
  },
];


export default function Home() {
  const [selectedTags, setSelectedTags] = useState(['all']);
  const [search, setSearch] = useState('');

  function handleTagClick(tag) {
    let tags = selectedTags.includes('all') ? [] : [...selectedTags];
    if (tags.includes(tag)) {
      tags = tags.filter(t => t !== tag);
    } else {
      if (tags.length >= 2) return;
      tags.push(tag);
    }
    if (tags.length === 0) tags = ['all'];
    setSelectedTags(tags);
  }

  const filtered = products.filter(product => {
    if (selectedTags.includes('all')) return true;
    return selectedTags.every(tag => product.tags.includes(tag));
  }).filter(product => {
    return !search || product.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {/* Top Nav */}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <h1 className="fw-bold text-black ms-3">Matt's Cloth Shop</h1>
          <div className="d-flex align-items-center ms-3">
            <select
              className="form-select me-3"
              style={{ width: 250 }}
              value={selectedTags[0] && selectedTags.length === 1 ? selectedTags[0] : ''}
              onChange={e => {
                if (e.target.value === 'all' || e.target.value === '') {
                  setSelectedTags(['all']);
                } else {
                  setSelectedTags([e.target.value]);
                }
              }}>
              <option value="all">All Categories</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="t-shirt">T-Shirts</option>
              <option value="shorts">Shorts</option>
              <option value="pants">Pants</option>
              <option value="coat">Coat</option>
            </select>

            <div className="input-group">
              <input
                type="text"
                className="form-control border-end-0"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="input-group-text bg-white border-start-0">
                <Search size={20} />
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Nav */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav d-flex justify-content-between w-75">
            <li className="nav-item">
              <a href="#categories" className="nav-link text-white">BROWSE PRODUCTS</a>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">HOME</Link>
            </li>
            <li className="nav-item"><a href="#footer" className="nav-link text-white">CONTACT US</a>

              
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link text-success">LOGIN/REGISTER</Link>
            </li>
            <li className="nav-item">
              <Link to="/checkout" className="nav-link text-white">
                <Cart size={20}/>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="mx-auto w-75 bg-white d-flex align-items-center justify-content-between px-0" style={{ marginTop: '25px' }}>
        <div className="d-flex justify-content-center align-items-center" style={{ width: '70%' }}>
          <div className="bg-light text-black p-4 w-100" style={{ maxWidth:'100%'}}>
            <p className="text-center">SUMMER SALE</p>
            <h2 className="text-center">UP TO 50% OFF</h2>
            <p className="text-center">From 12-21 JULY, TAKE YOUR TIME</p>
            <div className="d-flex justify-content-center mt-3">
              <a href="#categories" className="btn btn-outline-dark">See Detail</a>
            </div>
          </div>
        </div>
        <div className="flex-fill d-flex justify-content-end">
          <img
            src={logo}
            alt="main_pic"
            className="img-fluid"
            style={{maxWidth: '500px'}}/>
        </div>
      </div>

      <section id="categories" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Best Sell Product</h2>

          {/* Category buttons */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
            <button
              className={`btn ${selectedTags.includes('all') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setSelectedTags(['all'])}
            >All</button>
            <button
              className={`btn ${selectedTags.includes('male') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => handleTagClick('male')}
            >Male</button>
            <button
              className={`btn ${selectedTags.includes('female') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => handleTagClick('female')}
            >Female</button>
            <button
              className={`btn ${selectedTags.includes('t-shirt') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => handleTagClick('t-shirt')}
            >T-shirts</button>
            <button
              className={`btn ${selectedTags.includes('shorts') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => handleTagClick('shorts')}
            >Shorts</button>
            <button
              className={`btn ${selectedTags.includes('pants') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => handleTagClick('pants')}
            >Pants</button>
            <button
              className={`btn ${selectedTags.includes('coat') ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => handleTagClick('coat')}
            >Coat</button>
          </div>

          <div className="row g-4">
            {filtered.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="position-relative">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                      />
                      <button className="btn btn-light position-absolute top-0 end-0 m-2 p-1 rounded-circle">
                        <i className="bi bi-heart"></i>
                      </button>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text text-muted">{product.description}</p>
                      <div className="d-flex align-items-center">
                        <span className="fw-bold me-2">${product.price}</span>
                        <small className="text-muted text-decoration-line-through me-2">
                          ${product.originalPrice}
                        </small>
                        <small className="text-danger">({product.discount})</small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row text-center gx-5">

            <div className="col-12 col-md-4 mb-4">
              <Truck size={48} />
              <h5 className="fw-bold">FREE SHIPPING</h5>
              <div className="my-2">✦</div>
              <p className="mb-0">
                Enjoy free shipping on all orders<br/>
                no minimum purchase required.
              </p>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <Headset size={48} />
              <h5 className="fw-bold">24/7 SUPPORT</h5>
              <div className="my-2">✦</div>
              <p className="mb-0">
                Our team is available 24/7 to help<br/>
                with any questions or concerns.
              </p>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <CurrencyDollar size={48} />
              <h5 className="fw-bold">MONEY BACK</h5>
              <div className="my-2">✦</div>
              <p className="mb-0">
                We offer a 100% money back<br/>
                guarantee within 30 days.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className='text-black'>
  <div className='container justify-content-center align-items-center d-flex flex-column'>
    <h1 className='fw-bold'>
      Customer Reviews
    </h1>
    <div>
      <p>
       " As A Men Who Value My Outfit, I Love This Website "
      </p>
      <h2 className='fw-bold'>
        
      </h2>
    </div>
  </div>
</section>
<div style={{height:"60px"}}></div>


      <footer id="footer" className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md">
              <h5>About Shop</h5>
            </div>

            <div className="col-6 col-md">
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-white text-decoration-none">Store Locator</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              </ul>
            </div>

            <div className="col-6 col-md">
              <h5>Customer Care</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Size Guide</a></li>
                <li><a href="#" className="text-white text-decoration-none">Help & FAQs</a></li>
                <li><a href="#" className="text-white text-decoration-none">Return My Order</a></li>
                <li><a href="#" className="text-white text-decoration-none">Refer A Friend</a></li>
              </ul>
            </div>

            <div className="col-6 col-md">
              <h5>Terms & Policies</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Duties & Taxes</a></li>
                <li><a href="#" className="text-white text-decoration-none">Shipping Info</a></li>
                <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                <li><a href="#" className="text-white text-decoration-none">Terms & Conditions</a></li>
              </ul>
            </div>

            <div className="col-6 col-md">
              <h5>Follow Us</h5>
              <ul className="list-unstyled">
                <li><a href="https://www.instagram.com/the_pegasus100/" className="text-white text-decoration-none">Instagram</a></li>
                <li><a href="https://facebook.com" className="text-white text-decoration-none">Facebook</a></li>
                <li><a href="https://twitter.com" className="text-white text-decoration-none">Twitter</a></li>
                <li><a href="https://threads.com" className="text-white text-decoration-none">Threads</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

