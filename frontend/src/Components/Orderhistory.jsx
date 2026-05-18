import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import showNotification from './common/Notification';

// Helper function to format currency
const formatPrice = (price) => {
  return `₹${Number(price).toFixed(2)}`;
};

function Orderhistory() {
  const navigate = useNavigate();
  const { isLoggedIn, userEmail } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn || !userEmail) {
      navigate('/login');
      return;
    }

    console.log('User logged in:', isLoggedIn, 'Email:', userEmail);
    const fetchOrders = async () => {
      try {
        setError(null);
        const authData = JSON.parse(localStorage.getItem('authData') || '{}');
        const effectiveEmail = authData.userEmail || userEmail;
        
        console.log('Fetching orders for email:', effectiveEmail);
        const response = await axios.get(`http://localhost:5000/api/checkout/user/${effectiveEmail}`);
        console.log('Orders response:', response.data);
        
        if (Array.isArray(response.data)) {
          // Sort orders by date, most recent first
          const sortedOrders = response.data.sort((a, b) => 
            new Date(b.orderDate) - new Date(a.orderDate)
          );
          setOrders(sortedOrders);

          // Check for status changes and show notifications
          const lastKnownStatuses = JSON.parse(localStorage.getItem('lastOrderStatuses') || '{}');
          sortedOrders.forEach(order => {
            if (lastKnownStatuses[order._id] && lastKnownStatuses[order._id] !== order.status) {
              // Status has changed, show notification
              const statusMessages = {
                'preparing': 'Your order is now being prepared',
                'ready': 'Your order is ready for pickup',
                'completed': 'Your order has been completed',
                'cancelled': 'Your order has been cancelled'
              };

              showNotification(
                order.status === 'cancelled' ? 'error' : 'success',
                statusMessages[order.status] || `Order status updated to ${order.status}`
              );
            }
            // Update last known status
            lastKnownStatuses[order._id] = order.status;
          });
          localStorage.setItem('lastOrderStatuses', JSON.stringify(lastKnownStatuses));
        } else {
          console.error('Invalid orders data received:', response.data);
          setError('Invalid order data received');
          showNotification('error', 'Failed to load orders correctly');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
        showNotification('error', 'Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrders();

    // Set up polling for real-time updates
    const intervalId = setInterval(fetchOrders, 10000); // Poll every 10 seconds

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [isLoggedIn, userEmail, navigate]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { bg: 'bg-warning', icon: 'fa-clock', text: 'Pending' },
      confirmed: { bg: 'bg-info', icon: 'fa-thumbs-up', text: 'Confirmed' },
      preparing: { bg: 'bg-primary', icon: 'fa-fire', text: 'Preparing' },
      ready: { bg: 'bg-success', icon: 'fa-check-circle', text: 'Ready for Pickup' },
      completed: { bg: 'bg-success', icon: 'fa-check-double', text: 'Completed' },
      cancelled: { bg: 'bg-danger', icon: 'fa-times-circle', text: 'Cancelled' }
    };

    const style = statusStyles[status] || statusStyles.pending;
    return (
      <span className={`badge ${style.bg} d-flex align-items-center gap-1`}>
        <i className={`fas ${style.icon}`}></i>
        {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-circle me-2"></i>
          Error loading orders: {error}
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-sync-alt me-2"></i>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        <i className="fas fa-history me-2"></i>
        Order History
      </h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="fas fa-receipt text-muted" style={{ fontSize: '4rem' }}></i>
          </div>
          <h3 className="mb-3">No orders yet</h3>
          <p className="text-muted mb-4">You haven't placed any orders yet.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/menu')}
          >
            <i className="fas fa-utensils me-2"></i>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <i className="fas fa-receipt text-danger"></i>
                      <h5 className="mb-0">Order #{order._id.slice(-6)}</h5>
                    </div>
                    <small className="text-muted">
                      <i className="far fa-calendar-alt me-1"></i>
                      {new Date(order.orderDate).toLocaleDateString()}
                      <i className="far fa-clock ms-2 me-1"></i>
                      {new Date(order.orderDate).toLocaleTimeString()}
                    </small>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{width: "45%"}}>Item</th>
                          <th style={{width: "20%"}}>Price</th>
                          <th style={{width: "15%"}}>Qty</th>
                          <th style={{width: "20%"}}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <i className="fas fa-utensils text-secondary me-2"></i>
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td>{formatPrice(item.price)}</td>
                            <td>
                              <span className="badge bg-secondary">
                                {item.quantity}x
                              </span>
                            </td>
                            <td>{formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                        <tr className="table-light">
                          <td colSpan="3" className="text-end fw-bold">Total Amount:</td>
                          <td className="fw-bold">{formatPrice(order.totalAmount)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-muted">
                      <i className="fas fa-money-bill-wave me-1"></i>
                      Payment Method: {order.paymentMethod || 'Not specified'}
                    </span>
                    <span className="badge bg-light text-dark border">
                      <i className="fas fa-check-circle text-success me-1"></i>
                      Payment Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orderhistory