import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/api';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
    // Refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(apiUrl('/api/orders'));
      console.log('Fetched orders:', response.data);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning';
      case 'preparing':
        return 'bg-info';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Update order status
      const response = await axios.patch(apiUrl(`/api/orders/${orderId}/status`), {
        status: newStatus
      });
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId 
          ? response.data
          : order
      ));

      // Show success notification
      const statusMessages = {
        'preparing': 'Order accepted and being prepared',
        'ready': 'Order is ready for pickup',
        'completed': 'Order has been completed',
        'cancelled': 'Order has been cancelled'
      };

      const notification = document.createElement('div');
      notification.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
      notification.style.zIndex = '9999';
      notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ${statusMessages[newStatus] || `Order status updated to ${newStatus}`}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);

    } catch (error) {
      console.error('Error updating order status:', error);
      const notification = document.createElement('div');
      notification.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 m-3';
      notification.style.zIndex = '9999';
      notification.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        Failed to update order status
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const formatTimestamp = (date) => {
    const orderDate = new Date(date);
    const now = new Date();
    const diffMinutes = Math.round((now - orderDate) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.round(diffMinutes/60)} hours ago`;
    } else {
      return orderDate.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="container-fluid px-4 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Order Management</h2>
          <p className="text-muted">Manage and track all orders</p>
        </div>
        <div className="d-flex gap-2">
          <div className="btn-group">
            <button className="btn btn-outline-secondary">
              <i className="fas fa-filter"></i> Filter
            </button>
            <button className="btn btn-outline-secondary">
              <i className="fas fa-sort"></i> Sort
            </button>
          </div>
          <button className="btn btn-primary">
            <i className="fas fa-download me-2"></i>Export
          </button>
        </div>
      </div>

      {/* Order Cards */}
      <div className="row g-4">
        {orders.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h4>No Orders Found</h4>
            <p className="text-muted">There are no orders to display at this time.</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    {/* Order Info */}
                    <div className="col-md-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="order-id-badge me-2">#{order.orderId || order._id.slice(-6)}</div>
                        <span className={`status-indicator ${order.status.toLowerCase()}`}></span>
                      </div>
                      <div className="customer-info">
                        <div className="d-flex align-items-center mb-1">
                          <i className="fas fa-user-circle text-primary me-2"></i>
                          <strong className="customer-name">
                            {order.customerName || 'Guest'}
                          </strong>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <i className="fas fa-envelope text-secondary me-2"></i>
                          <small className="customer-email text-truncate">
                            {order.customerEmail || 'No email provided'}
                          </small>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-clock text-secondary me-2"></i>
                          <small className="text-muted">{formatTimestamp(order.orderDate)}</small>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="col-md-4">
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="d-flex justify-content-between mb-1">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="border-top pt-2 mt-2">
                          <strong>Total: ₹{order.totalAmount}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Status and Payment */}
                    <div className="col-md-3">
                      <div className="d-flex flex-column align-items-center">
                        <span className={`badge ${getStatusBadgeClass(order.status)} mb-2`}>
                          {order.status.toUpperCase()}
                        </span>
                        <small className="text-muted">
                          <i className="fas fa-clock me-1"></i>
                          {formatTime(order.orderDate)}
                        </small>
                        <small className="text-muted">
                          <i className="fas fa-wallet me-1"></i>
                          Payment ID: {order.paymentId || 'N/A'}
                        </small>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-md-2">
                      <div className="btn-group d-flex">
                        {order.status === 'pending' && (
                          <>
                            <button 
                              className="btn btn-success btn-sm"
                              onClick={() => handleStatusUpdate(order._id, 'preparing')}
                            >
                              <i className="fas fa-check me-1"></i>Accept
                            </button>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                            >
                              <i className="fas fa-times me-1"></i>Cancel
                            </button>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => handleStatusUpdate(order._id, 'ready')}
                          >
                            <i className="fas fa-utensils me-1"></i>Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusUpdate(order._id, 'completed')}
                          >
                            <i className="fas fa-check-double me-1"></i>Complete
                          </button>
                        )}
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .order-items {
          font-size: 0.9rem;
        }

        .badge {
          padding: 8px 12px;
          font-weight: 500;
        }

        .order-id-badge {
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          color: #2c3e50;
          border: 1px solid #dee2e6;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .status-indicator.pending {
          background-color: #ffc107;
        }

        .status-indicator.preparing {
          background-color: #17a2b8;
        }

        .status-indicator.ready {
          background-color: #28a745;
        }

        .status-indicator.completed {
          background-color: #198754;
        }

        .status-indicator.cancelled {
          background-color: #dc3545;
        }

        .customer-info {
          font-size: 0.9rem;
        }

        .customer-info i {
          width: 16px;
          text-align: center;
        }

        .customer-info .customer-name {
          font-size: 1rem;
          color: #2c3e50;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-info .customer-email {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #6c757d;
        }

        .btn-group .btn {
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        }

        .card {
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .order-items {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          max-height: 200px;
          overflow-y: auto;
        }

        .order-items::-webkit-scrollbar {
          width: 6px;
        }

        .order-items::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .order-items::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          .col-md-2, .col-md-3, .col-md-4 {
            margin-top: 1rem;
            text-align: center;
          }
          .customer-info {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default OrdersPage;
