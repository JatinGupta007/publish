import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    const selectedItem = menu.find((m) => String(m.id) === String(id));
    setItem(selectedItem);
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((c) => c.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/addcard"); // cart page
  };

  if (!item) {
    return <div className="text-center mt-5">Loading item...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Image */}
        <div className="col-md-6 text-center">
          <img
            src={item.img}
            alt={item.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>

        {/* Details */}
        <div className="col-md-6">
          <h2>{item.name}</h2>
          <h4 className="text-success">₹{item.price}</h4>
          <p className="mt-3">{item.description || "No description available."}</p>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center my-3">
            <label className="me-2 fw-bold">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="form-control"
              style={{ width: "80px" }}
            />
          </div>

          {/* Buttons */}
          <button className="btn btn-primary me-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
