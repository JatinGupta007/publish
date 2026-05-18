import React, { useState } from 'react';

function SettingsPage() {
  const [settings, setSettings] = useState({
    canteenName: 'Smart Canteen',
    openingTime: '09:00',
    closingTime: '18:00',
    phoneNumber: '+91-9876543210',
    email: 'contact@smartcanteen.com',
    address: 'College Campus, City - 123456',
    preparationTimeBuffer: 15,
    orderCancellationTime: 5,
    acceptingOrders: true,
    notifications: {
      newOrders: true,
      orderStatus: true,
      lowStock: true,
      dailyReport: true
    },
    paymentMethods: {
      cash: true,
      upi: true,
      cards: true,
      qrCode: true
    },
    theme: {
      primaryColor: '#dc3545',
      darkMode: false
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingChange = (category, setting, value) => {
    if (category) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [setting]: value
      }));
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change requested:', passwordData);
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Settings</h2>
          <p className="text-muted">Configure your canteen settings</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-save me-2"></i>Save Changes
        </button>
      </div>

      <div className="row g-4">
        {/* General Settings */}
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">General Settings</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Canteen Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={settings.canteenName}
                      onChange={(e) => handleSettingChange(null, 'canteenName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={settings.phoneNumber}
                      onChange={(e) => handleSettingChange(null, 'phoneNumber', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Opening Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={settings.openingTime}
                      onChange={(e) => handleSettingChange(null, 'openingTime', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Closing Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={settings.closingTime}
                      onChange={(e) => handleSettingChange(null, 'closingTime', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={settings.address}
                      onChange={(e) => handleSettingChange(null, 'address', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Order Settings */}
              <h6 className="mb-3">Order Settings</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Preparation Time Buffer (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={settings.preparationTimeBuffer}
                      onChange={(e) => handleSettingChange(null, 'preparationTimeBuffer', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Order Cancellation Time (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={settings.orderCancellationTime}
                      onChange={(e) => handleSettingChange(null, 'orderCancellationTime', e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={settings.acceptingOrders}
                      onChange={(e) => handleSettingChange(null, 'acceptingOrders', e.target.checked)}
                    />
                    <label className="form-check-label">Currently Accepting Orders</label>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Payment Methods */}
              <h6 className="mb-3">Payment Methods</h6>
              <div className="row g-3">
                {Object.entries(settings.paymentMethods).map(([method, enabled]) => (
                  <div className="col-md-3" key={method}>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleSettingChange('paymentMethods', method, e.target.checked)}
                      />
                      <label className="form-check-label">
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Security Settings</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordChange}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Notifications & Appearance */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Notifications</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                {Object.entries(settings.notifications).map(([notification, enabled]) => (
                  <div className="form-check form-switch mb-3" key={notification}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => handleSettingChange('notifications', notification, e.target.checked)}
                    />
                    <label className="form-check-label">
                      {notification.split(/(?=[A-Z])/).join(' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Appearance</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Primary Color</label>
                <input
                  type="color"
                  className="form-control form-control-color w-100"
                  value={settings.theme.primaryColor}
                  onChange={(e) => handleSettingChange('theme', 'primaryColor', e.target.value)}
                />
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={settings.theme.darkMode}
                  onChange={(e) => handleSettingChange('theme', 'darkMode', e.target.checked)}
                />
                <label className="form-check-label">Dark Mode</label>
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
        .form-check-input:checked {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .form-control:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default SettingsPage;
