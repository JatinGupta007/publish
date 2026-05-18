import React, { useState } from 'react';

function ReportsPage() {
  const [period, setPeriod] = useState('weekly');
  const [reportType, setReportType] = useState('sales');

  // Dummy data for reports
  const [salesData] = useState({
    daily: {
      total: 15000,
      orders: 75,
      average: 200,
      topItems: [
        { name: 'Veg Burger', quantity: 25, revenue: 2500 },
        { name: 'Cold Coffee', quantity: 30, revenue: 2400 },
        { name: 'Masala Dosa', quantity: 20, revenue: 3000 }
      ],
      hourlyTrends: [
        { hour: '9-10', orders: 5, revenue: 1000 },
        { hour: '10-11', orders: 8, revenue: 1600 },
        { hour: '11-12', orders: 12, revenue: 2400 }
      ]
    },
    weekly: {
      total: 85000,
      orders: 425,
      average: 200,
      topItems: [
        { name: 'Veg Burger', quantity: 150, revenue: 15000 },
        { name: 'Cold Coffee', quantity: 180, revenue: 14400 },
        { name: 'Masala Dosa', quantity: 120, revenue: 18000 }
      ],
      dailyTrends: [
        { day: 'Mon', orders: 65, revenue: 13000 },
        { day: 'Tue', orders: 58, revenue: 11600 },
        { day: 'Wed', orders: 72, revenue: 14400 }
      ]
    },
    monthly: {
      total: 350000,
      orders: 1750,
      average: 200,
      topItems: [
        { name: 'Veg Burger', quantity: 600, revenue: 60000 },
        { name: 'Cold Coffee', quantity: 720, revenue: 57600 },
        { name: 'Masala Dosa', quantity: 480, revenue: 72000 }
      ],
      weeklyTrends: [
        { week: 'Week 1', orders: 425, revenue: 85000 },
        { week: 'Week 2', orders: 438, revenue: 87600 },
        { week: 'Week 3', orders: 412, revenue: 82400 }
      ]
    }
  });

  const getCurrentData = () => {
    return salesData[period];
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Analytics & Reports</h2>
          <p className="text-muted">Monitor your business performance</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="fas fa-download me-2"></i>Export Report
          </button>
          <button className="btn btn-outline-secondary">
            <i className="fas fa-print me-2"></i>Print
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="btn-group w-100">
                <button 
                  className={`btn btn-lg ${period === 'daily' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setPeriod('daily')}
                >
                  Daily
                </button>
                <button 
                  className={`btn btn-lg ${period === 'weekly' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setPeriod('weekly')}
                >
                  Weekly
                </button>
                <button 
                  className={`btn btn-lg ${period === 'monthly' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setPeriod('monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select form-select-lg h-100 border-0"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Sales Report</option>
                <option value="orders">Order Analysis</option>
                <option value="items">Item Performance</option>
                <option value="customers">Customer Analytics</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Total Revenue</div>
                <div className="badge bg-success">+12.5%</div>
              </div>
              <h3 className="mb-0">₹{getCurrentData().total.toLocaleString()}</h3>
              <small className="text-success">
                <i className="fas fa-arrow-up me-1"></i>
                From previous {period}
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Total Orders</div>
                <div className="badge bg-primary">+8.2%</div>
              </div>
              <h3 className="mb-0">{getCurrentData().orders}</h3>
              <small className="text-primary">
                <i className="fas fa-arrow-up me-1"></i>
                {Math.round(getCurrentData().orders / 30)} orders per day
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Average Order</div>
                <div className="badge bg-info">₹{getCurrentData().average}</div>
              </div>
              <h3 className="mb-0">₹{getCurrentData().average}</h3>
              <small className="text-info">
                <i className="fas fa-info-circle me-1"></i>
                Per order average
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Top Item</div>
                <div className="badge bg-warning">Most Sold</div>
              </div>
              <h3 className="mb-0">{getCurrentData().topItems[0].name}</h3>
              <small className="text-warning">
                <i className="fas fa-star me-1"></i>
                {getCurrentData().topItems[0].quantity} orders
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Top Items Table */}
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Top Performing Items</h5>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="fas fa-download me-1"></i>Export
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity Sold</th>
                      <th>Revenue</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentData().topItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.revenue.toLocaleString()}</td>
                        <td>
                          <i className={`fas fa-arrow-${index === 0 ? 'up text-success' : 'down text-danger'}`}></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Quick Insights</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h6 className="text-muted mb-2">Peak Hours</h6>
                <div className="d-flex align-items-end mb-2" style={{ height: '100px' }}>
                  {getCurrentData().hourlyTrends?.map((trend, index) => (
                    <div
                      key={index}
                      className="bg-danger"
                      style={{
                        width: '30px',
                        height: `${(trend.orders / 15) * 100}%`,
                        marginRight: '10px',
                        borderRadius: '3px'
                      }}
                    ></div>
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  {getCurrentData().hourlyTrends?.map((trend, index) => (
                    <small key={index} className="text-muted">{trend.hour}</small>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="text-muted mb-3">Payment Methods</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>UPI</span>
                  <span className="text-success">45%</span>
                </div>
                <div className="progress mb-3" style={{ height: '5px' }}>
                  <div className="progress-bar bg-success" style={{ width: '45%' }}></div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Cash</span>
                  <span className="text-primary">35%</span>
                </div>
                <div className="progress mb-3" style={{ height: '5px' }}>
                  <div className="progress-bar bg-primary" style={{ width: '35%' }}></div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Card</span>
                  <span className="text-info">20%</span>
                </div>
                <div className="progress" style={{ height: '5px' }}>
                  <div className="progress-bar bg-info" style={{ width: '20%' }}></div>
                </div>
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
        .table th, .table td {
          padding: 1rem;
        }
        .progress {
          background-color: #f8f9fa;
        }
        .badge {
          padding: 6px 10px;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
          }
          .btn-group .btn {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ReportsPage;
