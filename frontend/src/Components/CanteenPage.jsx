import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Elements/Nav';
import Footer from '../Elements/Footer';

function CanteenPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      
      {/* Hero Section */}
      <section className="hero-section position-relative">
        <img 
          src="/menu-hero.jpg" 
          alt="Canteen Menu" 
          className="w-100" 
          style={{
            height: '600px',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 200, 200, 0.9), rgba(255, 235, 235, 0.85))'
          }}
        >
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-md-8">
                <h1 className="display-3 fw-bold mb-4" style={{ color: '#8B0000' }}>Welcome to Smart Canteen</h1>
                <p className="lead mb-4 fs-4" style={{ color: '#444' }}>Experience delicious meals with convenient online ordering</p>
                <button 
                  onClick={() => navigate('/menu')} 
                  className="btn btn-danger btn-lg px-4 py-2 fw-bold"
                  style={{ background: '#8B0000', borderColor: '#8B0000' }}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 my-5" style={{ background: 'linear-gradient(135deg, #ffebeb 0%, #fff5f5 100%)' }}>
        <div className="container py-4">
          <div className="section-card rounded-4 shadow-lg p-5" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
            <h2 className="text-center mb-5 fw-bold">Why Choose Us</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card bg-white p-4 rounded-4 shadow h-100" style={{ borderTop: '4px solid #dc3545' }}>
                  <div className="text-center">
                    <div className="feature-icon-wrapper mb-3">
                      <i className="fas fa-utensils fa-2x text-danger"></i>
                    </div>
                    <h3 className="h4 mb-3">Fresh Food</h3>
                    <p className="text-muted mb-0">Enjoy freshly prepared meals daily using the finest ingredients</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card bg-white p-4 rounded-4 shadow h-100" style={{ borderTop: '4px solid #dc3545' }}>
                  <div className="text-center">
                    <div className="feature-icon-wrapper mb-3">
                      <i className="fas fa-mobile-alt fa-2x text-danger"></i>
                    </div>
                    <h3 className="h4 mb-3">Easy Ordering</h3>
                    <p className="text-muted mb-0">Simple and convenient online ordering system at your fingertips</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card bg-white p-4 rounded-4 shadow h-100" style={{ borderTop: '4px solid #dc3545' }}>
                  <div className="text-center">
                    <div className="feature-icon-wrapper mb-3">
                      <i className="fas fa-clock fa-2x text-danger"></i>
                    </div>
                    <h3 className="h4 mb-3">Quick Service</h3>
                    <p className="text-muted mb-0">Minimal waiting time with our efficient service system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="menu-preview-section py-5 my-5" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
        <div className="container py-4">
          <div className="section-card rounded-4 shadow-lg p-5" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
            <h2 className="text-center mb-5 fw-bold">Popular Menu Items</h2>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="menu-item-card bg-white rounded-4 shadow overflow-hidden">
                  <img src="/a1.avif" alt="Sandwich" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="p-3">
                    <h5 className="mb-2">Sandwich</h5>
                    <p className="text-danger mb-0 fw-bold">₹50</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="menu-item-card bg-white rounded-4 shadow overflow-hidden">
                  <img src="/a7.avif" alt="Pizza" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="p-3">
                    <h5 className="mb-2">Fresh Pizza</h5>
                    <p className="text-danger mb-0 fw-bold">₹100</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="menu-item-card bg-white rounded-4 shadow overflow-hidden">
                  <img src="/a12.avif" alt="Pasta" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="p-3">
                    <h5 className="mb-2">White Sauce Pasta</h5>
                    <p className="text-danger mb-0 fw-bold">₹60</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="menu-item-card bg-white rounded-4 shadow overflow-hidden">
                  <img src="/a4.jpeg" alt="Burger" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="p-3">
                    <h5 className="mb-2">Burger</h5>
                    <p className="text-danger mb-0 fw-bold">₹45</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button onClick={() => navigate('/menu')} className="btn btn-outline-danger btn-lg px-4">
                View Full Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-5 my-5" style={{ background: 'linear-gradient(135deg, #ffe6e6 0%, #fff0f0 100%)' }}>
        <div className="container py-4">
          <div className="section-card rounded-4 shadow-lg p-5" style={{ background: 'rgba(255, 255, 255, 0.9)', color: 'black' }}>
            <h2 className="text-center mb-5 fw-bold">Our Services</h2>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="service-card text-center p-4" style={{ background: 'rgba(255, 255, 255, 0.9)', borderTop: '4px solid #dc3545' }}>
                  <i className="fas fa-users fa-2x text-danger mb-3"></i>
                  <h4 className="mb-3">Group Orders</h4>
                  <p className="text-muted mb-0">Special discounts for bulk orders</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="service-card text-center p-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <i className="fas fa-truck fa-2x text-danger mb-3"></i>
                  <h4 className="mb-3">Table Service</h4>
                  <p className="text-light-50 mb-0">Food served at your table</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="service-card text-center p-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <i className="fas fa-calendar-alt fa-2x text-danger mb-3"></i>
                  <h4 className="mb-3">Event Catering</h4>
                  <p className="text-light-50 mb-0">Special events & functions</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="service-card text-center p-4" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <i className="fas fa-headset fa-2x text-danger mb-3"></i>
                  <h4 className="mb-3">24/7 Support</h4>
                  <p className="text-light-50 mb-0">Always here to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-section py-5 my-5" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)' }}>
        <div className="container py-4">
          <div className="section-card rounded-4 shadow-lg p-5" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="fw-bold mb-4">Download Our Mobile App</h2>
                <p className="lead mb-4">Get the best canteen experience with our mobile app. Order food, track your orders, and get exclusive offers.</p>
                <div className="d-flex gap-3">
                  <button className="btn btn-dark btn-lg" style={{ background: '#000000' }}>
                    <i className="fab fa-apple me-2"></i>App Store
                  </button>
                  <button className="btn btn-dark btn-lg" style={{ background: '#333333' }}>
                    <i className="fab fa-google-play me-2"></i>Play Store
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-4">
                  <img src="/cafeteria4.avif" alt="Mobile App" className="img-fluid rounded-4 shadow-lg" style={{ transform: 'scale(1.02)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          background: #fff5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .menu-item-card {
          transition: all 0.3s ease;
        }
        
        .menu-item-card:hover {
          transform: translateY(-5px);
        }
        
        .service-card {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          border-color: #dc3545;
        }
      `}</style>
    </div>
  );
}

export default CanteenPage;
