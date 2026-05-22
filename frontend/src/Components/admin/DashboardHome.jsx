import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/api';

function DashboardHome() {
  const [stats, setStats] = useState({
    ordersToday: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeCustomers: 0,
    popularItems: [],
    recentOrders: [],
    recentCustomers: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, reportsResponse, ordersResponse, customersResponse] = await Promise.all([
        axios.get(apiUrl('/api/manager/stats')),
        axios.get(apiUrl('/api/manager/reports')),
        axios.get(apiUrl('/api/orders')),
        axios.get(apiUrl('/api/manager/customers'))
      ]);

      setStats({
        ordersToday: statsResponse.data.ordersToday || 0,
        totalRevenue: statsResponse.data.totalRevenue || 0,
        pendingOrders: statsResponse.data.pendingOrders || 0,
        activeCustomers: statsResponse.data.totalCustomers || customersResponse.data.length || 0,
        popularItems: (reportsResponse.data.popularItems || []).map(item => ({
          name: item._id,
          orders: item.totalOrdered,
          revenue: item.revenue
        })),
        recentOrders: (ordersResponse.data || []).slice(0, 4).map(order => ({
          id: order.orderId || order._id?.slice(-6),
          customer: order.customerName || order.customerEmail || 'Guest',
          items: order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
          status: order.status || 'pending'
        })),
        recentCustomers: (customersResponse.data || []).slice(0, 4).map(customer => ({
          name: customer.username || customer.email,
          orders: '-',
          lastOrder: customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'
        }))
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return 'bg-warning';
      case 'ready':
        return 'bg-success';
      case 'pending':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Dashboard</h2>
          <p className="text-muted">Welcome back to Smart Canteen</p>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-primary me-2">
            <i className="fas fa-download me-2"></i>Download Report
          </button>
          <button className="btn btn-primary" onClick={fetchDashboardData}>
            <i className="fas fa-sync-alt me-2"></i>Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card shadow-sm border-start border-5 border-primary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-6 text-muted mb-1">Orders Today</div>
                  <div className="fs-4 fw-bold">{loading ? '...' : stats.ordersToday}</div>
                  <div className="small text-success">
                    <i className="fas fa-arrow-up me-1"></i>12% increase
                  </div>
                </div>
                <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                  <i className="fas fa-shopping-bag text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card shadow-sm border-start border-5 border-success h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-6 text-muted mb-1">Total Revenue</div>
                  <div className="fs-4 fw-bold">₹{loading ? '...' : stats.totalRevenue}</div>
                  <div className="small text-success">
                    <i className="fas fa-arrow-up me-1"></i>8% increase
                  </div>
                </div>
                <div className="rounded-circle bg-success bg-opacity-10 p-3">
                  <i className="fas fa-rupee-sign text-success fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card shadow-sm border-start border-5 border-warning h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-6 text-muted mb-1">Pending Orders</div>
                  <div className="fs-4 fw-bold">{loading ? '...' : stats.pendingOrders}</div>
                  <div className="small text-warning">
                    <i className="fas fa-clock me-1"></i>Need attention
                  </div>
                </div>
                <div className="rounded-circle bg-warning bg-opacity-10 p-3">
                  <i className="fas fa-hourglass-half text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card shadow-sm border-start border-5 border-info h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-6 text-muted mb-1">Active Customers</div>
                  <div className="fs-4 fw-bold">{loading ? '...' : stats.activeCustomers}</div>
                  <div className="small text-success">
                    <i className="fas fa-arrow-up me-1"></i>5% increase
                  </div>
                </div>
                <div className="rounded-circle bg-info bg-opacity-10 p-3">
                  <i className="fas fa-users text-info fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Popular Items */}
        <div className="col-xl-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Popular Items</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Orders</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.popularItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.orders}</td>
                        <td>₹{item.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-xl-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.items}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="col-xl-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Customers</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Orders</th>
                      <th>Last Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentCustomers.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.name}</td>
                        <td>{customer.orders}</td>
                        <td>{customer.lastOrder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .table td, .table th {
          padding: 1rem;
        }
        .badge {
          font-weight: 500;
          padding: 0.5em 0.75em;
        }
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
          }
          .btn-group .btn {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default DashboardHome;
