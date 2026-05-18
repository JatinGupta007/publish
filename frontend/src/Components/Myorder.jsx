import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Myorder() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate]);

  // Listen for auth changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken" && !e.newValue) {
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update cart in localStorage
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  // Calculate total
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
        <h2 className="mb-4">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-shopping-cart text-muted" style={{ fontSize: '4rem' }}></i>
            </div>
            <h3 className="mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="btn btn-danger btn-lg px-4">
                <i className="fas fa-home me-2"></i>
                Go to Homepage
              </Link>
              <Link to="/menu" className="btn btn-outline-primary btn-lg px-4">
                <i className="fas fa-utensils me-2"></i>
                Browse Menu
              </Link>
            </div>
          </div>
        ) : (
          <>
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.img}
                        alt={item.name}
                        width="60"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "5px" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button 
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() => decreaseQty(item.id)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="btn btn-sm btn-secondary ms-2"
                          onClick={() => increaseQty(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Order Summary</h5>
                  <h5 className="mb-0">Total: ₹{totalPrice}</h5>
                </div>
                <div className="d-flex justify-content-end">
                  <Link to="/menu" className="btn btn-outline-secondary me-2">
                    <i className="fas fa-utensils me-2"></i>
                    Back to Menu
                  </Link>
                  <Link 
                    className="btn btn-danger" 
                    to="/checkout"
                    style={{
                      minWidth: "200px",
                      background: "linear-gradient(45deg, #dc3545, #ff4d5f)",
                      border: "none",
                      transition: "transform 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
  );
}

export default Myorder;