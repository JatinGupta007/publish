import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/manager/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to fetch customers');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Customers</h2>
          <p className="text-muted mb-0">Manage and view customer information</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-download me-2"></i>
          Export Data
        </button>
      </div>

      {/* Customer Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded-circle p-2 me-3">
                          <i className="fas fa-user text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-bold">{customer.username || 'N/A'}</div>
                          <small className="text-muted">ID: {customer._id}</small>
                        </div>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{formatDate(customer.createdAt)}</td>
                    <td>
                      <div className="btn-group">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-info"
                          title="Order History"
                        >
                          <i className="fas fa-history"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          title="Block Customer"
                        >
                          <i className="fas fa-ban"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {customers.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-users text-muted fa-3x mb-3"></i>
          <h4>No Customers Found</h4>
          <p className="text-muted">There are no customers registered yet.</p>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;
