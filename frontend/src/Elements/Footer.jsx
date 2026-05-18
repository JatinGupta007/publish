import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="text-white py-5" style={{ backgroundColor: '#8B0000' }}>
        <div className="container">
          <div className="row g-4">
            {/* About */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4">SmartCanteen</h5>
              <p className="text-white mb-4">Making campus dining smarter, faster, and more convenient for students and staff.</p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                <li className="mb-2"><Link to="/menu" className="text-white text-decoration-none">Menu</Link></li>
                <li className="mb-2"><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
                {localStorage.getItem('token') ? (
                  <li className="mb-2"><Link to="/myorder" className="text-white text-decoration-none">My Orders</Link></li>
                ) : null}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4">Contact Us</h5>
              <ul className="list-unstyled text-white">
                <li className="mb-2 d-flex align-items-start">
                  <i className="fas fa-map-marker-alt mt-1 me-2"></i>
                  <span>123 University Avenue, Campus Area</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="fas fa-phone-alt me-2"></i>
                  <span>+91 9876543210</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="fas fa-envelope me-2"></i>
                  <span>info@smartcanteen.edu</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-4">Newsletter</h5>
              <p className="text-white mb-4">Subscribe for updates on new dishes and special offers.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Your email" />
                <button className="btn btn-danger">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4 border-secondary" />

          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <small className="text-white">© 2025 SmartCanteen. All rights reserved.</small>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex gap-3 justify-content-center justify-content-md-end">
                <a href="#" className="text-white text-decoration-none small">Privacy Policy</a>
                <a href="#" className="text-white text-decoration-none small">Terms of Service</a>
                <a href="#" className="text-white text-decoration-none small">FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
