import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardHome from './admin/DashboardHome';
import OrdersPage from './admin/OrdersPage';
import MenuPage from './admin/MenuPage';
import AddItemPage from './admin/AddItemPage';
import CustomersPage from './admin/CustomersPage';
import ReportsPage from './admin/ReportsPage';
import SettingsPage from './admin/SettingsPage';
import MessagesPage from './admin/MessagesPage';

function ManagerDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/manager', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/manager/orders', icon: 'fas fa-box', label: 'Orders' },
    { path: '/manager/menu', icon: 'fas fa-utensils', label: 'Menu' },
    { path: '/manager/add-item', icon: 'fas fa-plus-circle', label: 'Add Item' },
    { path: '/manager/customers', icon: 'fas fa-users', label: 'Customers' },
    { path: '/manager/messages', icon: 'fas fa-envelope', label: 'Messages' },
    { path: '/manager/reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { path: '/manager/settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header p-3 border-bottom border-danger">
          <div className="d-flex flex-column align-items-center mb-3">
            <img 
              src="/mainlogo.png" 
              alt="College Logo" 
              className="img-fluid mb-2"
              style={{ 
                width: sidebarOpen ? '120px' : '40px',
                transition: 'width 0.3s'
              }} 
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-light mb-0">🍽 Smart Canteen</h5>
            <button 
              className="btn btn-link text-light p-0 d-none d-md-block"
              onClick={toggleSidebar}
            >
              <i className={`fas fa-chevron-${sidebarOpen ? 'left' : 'right'}`}></i>
            </button>
          </div>
        </div>
        
        <div className="p-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`
                sidebar-link d-flex align-items-center text-light text-decoration-none p-2 mb-2 rounded
                ${location.pathname === item.path ? 'active' : ''}
              `}
            >
              <i className={`${item.icon} me-3`}></i>
              <span className={sidebarOpen ? '' : 'd-none'}>{item.label}</span>
            </Link>
          ))}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleLogout(); }}
            className="sidebar-link d-flex align-items-center text-light text-decoration-none p-2 mb-2 rounded"
          >
            <i className="fas fa-sign-out-alt me-3"></i>
            <span className={sidebarOpen ? '' : 'd-none'}>Logout</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Mobile Header */}
        <div className="d-md-none bg-dark text-light p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Smart Canteen</h5>
            <button 
              className="btn btn-link text-light p-0"
              onClick={toggleSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Routes */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          min-height: 100vh;
          width: 250px;
          transition: width 0.3s;
          background: #8B0000;
          z-index: 1000;
          overflow-y: auto;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
        }
        
        .sidebar.collapsed {
          width: 70px;
        }
        
        .main-content {
          margin-left: ${sidebarOpen ? '250px' : '70px'};
          transition: margin-left 0.3s;
        }
        
        .sidebar-link {
          transition: all 0.3s ease;
          margin: 2px 0;
          opacity: 0.8;
        }
        
        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
          opacity: 1;
        }
        
        .sidebar-link.active {
          background-color: var(--bs-primary);
          opacity: 1;
        }

        .sidebar-link i {
          width: 20px;
          text-align: center;
        }
        
        .main-content {
          flex: 1;
          min-height: 100vh;
          background-color: #f8f9fa;
          overflow-x: hidden;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: ${sidebarOpen ? '0' : '-250px'};
            height: 100vh;
            box-shadow: ${sidebarOpen ? '0 0 15px rgba(0,0,0,0.2)' : 'none'};
          }
          
          .sidebar.collapsed {
            width: 250px;
            left: -250px;
          }
          
          .main-content {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ManagerDashboard;
