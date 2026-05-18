// src/pages/AddCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AddCard() {
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
        <p>Your cart is empty. <Link to="/menu">Go to Menu</Link></p>
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
                      <button className="btn btn-sm btn-secondary me-2"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={() => increaseQty(item.id)}>
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

          <div className="text-end mt-3">
            <h4>Total: ₹{totalPrice}</h4>
            <Link className="btn btn-success mt-2" to={'/checkout'}>Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default AddCard;
