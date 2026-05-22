import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import showNotification from './common/Notification';
import { apiUrl } from '../utils/api';

function Menu() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState([]);

  const [defaultItems] = useState([
    { id: 1, name: "Sandwich", price: 50, quantity: 20, img: "/a1.avif" },
    { id: 2, name: "Coffee", price: 30, quantity: 32, img: "/a2.avif" },
    { id: 3, name: "Light Orange Juice", price: 60, quantity: 26, img: "/a3.avif" },
    { id: 4, name: "Tea", price: 20, quantity: 18, img: "/a5.avif" },
    { id: 5, name: "Chocolate Chip Cookies", price: 10, quantity: 24, img: "/a6.avif" },
    { id: 6, name: "Jeera Masala Soda", price: 25, quantity: 18, img: "/a7.avif" }
  ]);

  const fetchMenuItems = useCallback(async () => {
    try {
      const response = await fetch(apiUrl('/api/menu/items'));
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        console.log('Loaded menu items:', data);
        // Only show available items and map image property to img
        setItems(data.filter(item => item.available).map(item => ({
          id: item.id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          img: item.image,
          description: item.description
        })));
      } else {
        console.log('No items found, using default data');
        setItems(defaultItems);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      console.log('Using default items due to error');
      setItems(defaultItems);
    }
  }, [defaultItems]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  
  // Initialize filtered items when items change
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // Adds item to cart in localStorage.
  // Cart items will have: { id, name, price, img, quantity }  <-- quantity = cart count
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // increase cart qty
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      // push a cart item (quantity here is the cart quantity, not stock)
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // add to cart and show notification
  const handleAddAndGo = (item) => {
    addToCart(item);
    // Show feedback to user using the new notification component
    showNotification('success', `${item.name} added to cart successfully!`);
  };

  const handleSearch = () => {
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  };

  return (
    <>
      <div className="container-fluid menu-container">
        <div className="container py-4 glass-container">
          <h2 className="text-danger fw-bold display-4 mb-4">
            Our Menu
          </h2>

          {/* Carousel (className fixed) */}
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner mb-5 rounded-5">
              <div className="carousel-item active">
                <img src="s1.jpg" style={{height:'500px'}} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="s2.jpg"  style={{height:'500px'}} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="s3.jpg"  style={{height:'500px'}} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <h4 className="mb-3 text-danger">
            Today's Menu
          </h4>
          <div className="row mb-3">
            <div className="col-12">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <button
                  className="btn btn-primary px-4"
                  onClick={handleSearch}
                >
                  <i className="fas fa-search me-2"></i>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="row ">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div className="card h-100 menu-card glass-effect">
                  <div className="position-relative">
                    <img src={item.img} className="card-img-top menu-img" alt={item.name} height="200px" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="card-title fw-bold mb-1">{item.name}</h5>
                        <p className="card-text text-danger fw-bold mb-1">₹{item.price}</p>
                        <p className="card-text text-muted small mb-0">
                          <i className="fas fa-box me-1"></i> {item.quantity} available
                        </p>
                      </div>
                      <button className="btn btn-danger btn-sm ms-2" onClick={() => handleAddAndGo(item)}>
                        <i className="fas fa-cart-plus me-1"></i>Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Canteen Timings Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="glass-effect rounded-4 shadow-sm p-4">
                <h3 className="text-center text-danger mb-4"></h3>
                <div className="row g-4">
                  {/* Address Column */}
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center h-100 p-3 border-end border-md-none">
                      <i className="fas fa-map-marker-alt text-danger fa-2x mb-3"></i>
                      <h5 className="fw-bold mb-3">Location</h5>
                      <p className="mb-0 text-secondary">
                        Smart Canteen,<br />
                        R.P. (Lawn) Road,<br />
                        Gonda, Uttar Pradesh,<br />
                        India (REC GONDA)
                      </p>
                    </div>
                  </div>
                  
                  {/* Breakfast Column */}
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center h-100 p-3 border-end border-md-none">
                      <i className="fas fa-coffee text-danger fa-2x mb-3"></i>
                      <h5 className="fw-bold mb-3">Breakfast</h5>
                      <p className="mb-0 text-secondary">
                        Monday - Friday<br />
                        7:30 AM - 10:30 AM<br />
                        <span className="badge bg-danger mt-2">Hot & Fresh</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Lunch Column */}
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center h-100 p-3 border-end border-md-none">
                      <i className="fas fa-utensils text-danger fa-2x mb-3"></i>
                      <h5 className="fw-bold mb-3">Lunch</h5>
                      <p className="mb-0 text-secondary">
                        Monday - Friday<br />
                        12:00 PM - 3:00 PM<br />
                        <span className="badge bg-danger mt-2">Full Menu</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Dinner Column */}
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center h-100 p-3">
                      <i className="fas fa-moon text-danger fa-2x mb-3"></i>
                      <h5 className="fw-bold mb-3">Dinner</h5>
                      <p className="mb-0 text-secondary">
                        Monday - Friday<br />
                        6:00 PM - 9:00 PM<br />
                        <span className="badge bg-danger mt-2">Special Menu</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Cart Button */}
      <Link 
        to="/myorder" 
        className="floating-cart-btn"
        onClick={(e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            showNotification('warning', "Please login first to access Cart");
            setTimeout(() => navigate('/login'), 1500);
          }
        }}
      >
        <i className="fas fa-shopping-cart me-2"></i>
        Go to Cart
      </Link>

      <style jsx>{`
        .menu-container {
          min-height: 100vh;
          background: linear-gradient(to right, #fee2e2 50%, #fef2f2 100%);
          padding: 2rem 0;
        }

        .floating-cart-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background-color: #8B0000;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
          transition: all 0.3s ease;
          text-decoration: none;
          z-index: 1000;
          display: flex;
          align-items: center;
          font-weight: 500;
        }

        .floating-cart-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(139, 0, 0, 0.4);
          color: white;
          background-color: #a00000;
        }

        @media (max-width: 768px) {
          .floating-cart-btn {
            bottom: 1.5rem;
            right: 1.5rem;
            padding: 0.75rem 1.25rem;
            font-size: 0.9rem;
          }
        }

        .glass-container {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 16px 0 rgba(139, 0, 0, 0.1);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .menu-card {
          transition: all 0.3s ease;
          border: none;
          overflow: hidden;
        }

        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .menu-img {
          transition: all 0.3s ease;
        }

        .menu-card:hover .menu-img {
          transform: scale(1.1);
        }

        .menu-card .btn {
          transition: all 0.3s ease;
          white-space: nowrap;
          padding: 0.4rem 0.8rem;
          font-size: 0.9rem;
        }

        .menu-card:hover .btn {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.2);
        }

        @media (max-width: 768px) {
          .menu-card .btn {
            padding: 0.3rem 0.6rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}

export default Menu;
