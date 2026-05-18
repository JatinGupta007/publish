import React from 'react'
import { Link } from 'react-router-dom'
import HomeContent from './HomeContent'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="display-4 fw-bold mb-4">Welcome to<br/><span className="text-danger">Smart Canteen</span></h1>
              <p className="lead mb-4">Pre-order meals, avoid lines, and enjoy delicious campus dining with our digital solution.</p>
              <div className="d-flex flex-column flex-sm-row">
                <Link to="/menu" className="btn btn-danger btn-lg px-4">
                  <i className="fas fa-utensils me-2"></i>Order Now
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative">
                <img src="/menu-hero.jpg" alt="Delicious meal platter" className="img-fluid rounded-3 shadow" />
                <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-3 shadow d-none d-md-block ms-3 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-2 rounded-circle me-3">
                      <i className="fas fa-bolt text-success"></i>
                    </div>
                    <div>
                      <p className="mb-0 small fw-medium">Fast Delivery</p>
                      <p className="mb-0 small text-muted">Under 15 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5"  style={{backgroundColor:'rgba(240, 203, 203, 0.68)'}}>
        <div className="container">
          <h2 className="text-center display-6 fw-bold mb-5">Why Choose SmartCanteen</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
                    <i className="fas fa-clock text-danger fa-2x"></i>
                  </div>
                  <h3 className="h5 mb-3">Time-Saving</h3>
                  <p className="text-muted mb-0">Order ahead and skip the queues. Collect your food at your convenience.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
                    <i className="fas fa-wallet text-success fa-2x"></i>
                  </div>
                  <h3 className="h5 mb-3">Cashless Payments</h3>
                  <p className="text-muted mb-0">Secure digital payments with your campus ID or mobile wallet.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-4">
                    <i className="fas fa-chart-line text-primary fa-2x"></i>
                  </div>
                  <h3 className="h5 mb-3">Smart Analytics</h3>
                  <p className="text-muted mb-0">Track your eating habits and spending with personalized insights.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 " >
        <div className="container">
          <h2 className="text-center display-6 fw-bold mb-5">How It Works</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4 text-center position-relative">
              <div className="bg-danger rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="h4 mb-0">1</span>
              </div>
              <img src="/s1.jpg" alt="Browse Menu" className="img-fluid rounded-3 shadow-sm mb-4" style={{height: '160px', objectFit: 'cover'}} />
              <h3 className="h5 mb-2">Browse Menu</h3>
              <p className="text-muted mb-0">Explore our menu and select your favorite items from anywhere on campus.</p>
              <div className="position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
                <i className="fas fa-chevron-right text-muted fa-2x"></i>
              </div>
            </div>
            <div className="col-md-4 text-center position-relative">
              <div className="bg-danger rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="h4 mb-0">2</span>
              </div>
              <img src="/s2.jpg" alt="Place Order" className="img-fluid rounded-3 shadow-sm mb-4" style={{height: '160px', objectFit: 'cover'}} />
              <h3 className="h5 mb-2">Place Order</h3>
              <p className="text-muted mb-0">Add items to cart and pay securely using your preferred payment method.</p>
              <div className="position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
                <i className="fas fa-chevron-right text-muted fa-2x"></i>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-danger rounded-circle text-white d-inline-flex align-items-center justify-content-center mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="h4 mb-0">3</span>
              </div>
              <img src="/s3.jpg" alt="Quick Pickup" className="img-fluid rounded-3 shadow-sm mb-4" style={{height: '160px', objectFit: 'cover'}} />
              <h3 className="h5 mb-2">Quick Pickup</h3>
              <p className="text-muted mb-0">Get notified when your order is ready and collect it from the canteen.</p>
            </div>
          </div>
        </div>
      </section>
      
      <HomeContent />
    </>
  )
}

export default Home