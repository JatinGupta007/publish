import React, { useState, useEffect } from 'react';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [categories] = useState([
    'All',
    'South Indian',
    'North Indian',
    'Chinese',
    'Italian',
    'Main Course',
    'Snacks',
    'Beverages',
    'Desserts'
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch menu items from backend when component mounts
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/menu/items');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityToggle = async (id) => {
    try {
      const item = menuItems.find(item => item.id === id);
      const response = await fetch(`http://localhost:5000/api/menu/items/${id}/availability`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ available: !item.available })
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setMenuItems(menuItems.map(item =>
          item.id === id ? updatedItem : item
        ));
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="container-fluid px-4">
        <div className="text-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-4">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-danger ms-3"
            onClick={fetchMenuItems}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Menu Management</h2>
          <p className="text-muted">Manage your food items and categories</p>
        </div>
      </div>

      {/* Categories */}
      <div className="category-scroll mb-4">
        <div className="d-flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="row g-4">
        {filteredItems.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">No items found in this category</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  <img 
                    src={item.image.startsWith('data:') ? item.image : item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <span className={`badge position-absolute top-0 end-0 m-2 ${
                    item.available ? 'bg-success' : 'bg-danger'
                  }`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="card-title mb-1">{item.name}</h5>
                      <span className="badge bg-light text-dark">{item.category}</span>
                    </div>
                    <h5 className="text-danger mb-0">₹{item.price}</h5>
                  </div>
                  <p className="card-text text-muted small">{item.description}</p>
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-clock text-muted me-2"></i>
                    <small className="text-muted">{item.preparationTime} mins</small>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className={`btn btn-sm flex-grow-1 ${
                        item.available ? 'btn-outline-danger' : 'btn-success'
                      }`}
                      onClick={() => handleAvailabilityToggle(item.id)}
                    >
                      <i className={`fas fa-${item.available ? 'times' : 'check'} me-1`}></i>
                      {item.available ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .category-scroll {
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 5px;
        }
        .category-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .category-scroll::-webkit-scrollbar-thumb {
          background-color: #dc3545;
          border-radius: 3px;
        }
        .card {
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default MenuPage;
