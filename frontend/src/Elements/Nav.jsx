import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import showNotification from '../Components/common/Notification';

function Nav() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, userEmail } = useAuth();

  // Get user initials from email (text before @)
  const getUserInitials = () => {
    if (!userEmail) return '';
    const username = userEmail.split('@')[0];
    // Take first two characters, or if only one character, use that
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{ backgroundColor: '#8B0000' }}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="rounded-circle bg-white d-flex align-items-center justify-content-center text-danger fw-bold me-2" style={{ width: '48px', height: '48px' }}>
            SC
          </div>
          <span className="fs-4 fw-bold text-white">
            Smart<span className="text-white">Canteen</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon bg-white"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white fw-medium">
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link text-white">
                <i className="fas fa-utensils me-1"></i>
                Menu
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to="/myorder" className="nav-link text-white">
                  <i className="fas fa-shopping-cart me-1"></i>
                  My Cart
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="nav-link text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification('warning', "Please login first to access Cart");
                    setTimeout(() => navigate('/login'), 1500);
                  }}
                >
                  <i className="fas fa-shopping-cart me-1"></i>
                  My Cart
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to="/orderhistory" className="nav-link text-white">
                  <i className="fas fa-history me-1"></i>
                  Order History
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="nav-link text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotification('warning', "Please login first to view Order History");
                    setTimeout(() => navigate('/login'), 1500);
                  }}
                >
                  <i className="fas fa-history me-1"></i>
                  Order History
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">
                <i className="fas fa-envelope me-1"></i>
                Contact
              </Link>
            </li>
          </ul>

          {/* User Icon and Auth Button */}
          <div className="d-flex align-items-center mt-2 mt-lg-0 gap-3">
            {isLoggedIn && userEmail && (
              <div 
                className="rounded-circle bg-white d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '40px', 
                  height: '40px',
                  color: '#8B0000',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
                title={userEmail.split('@')[0]} // Show full username on hover
              >
                {getUserInitials()}
              </div>
            )}
            {isLoggedIn ? (
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                    showNotification('success', 'Logged out successfully');
                    setTimeout(() => navigate("/"), 1000);
                  }
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-light">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;