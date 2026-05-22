import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../utils/api';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Confirmation
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    
    // Calculate total
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);

    // Check for pending payment
    const pendingPayment = localStorage.getItem('pendingPayment');
    if (pendingPayment) {
      const { timestamp } = JSON.parse(pendingPayment);
      const timeDiff = new Date().getTime() - timestamp;
      
      // If user returns within 10 minutes, assume payment is completed
      if (timeDiff < 600000) { // 10 minutes in milliseconds
        localStorage.removeItem('pendingPayment');
        localStorage.removeItem('cart');
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        startTimer();
        setStep(3);
      } else {
        // Clear pending payment if too much time has passed
        localStorage.removeItem('pendingPayment');
      }
    }
  }, []);

  const generateOrderId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const startTimer = () => {
    const preparationTime = 15 * 60; // 15 minutes in seconds
    setTimer(preparationTime);

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Clear pending payment flag
      localStorage.removeItem('pendingPayment');
      
      // Generate order ID and start timer
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      startTimer();

      // Clear cart
      localStorage.removeItem('cart');
      
      // Update UI to show success
      setShowPaymentModal(false);
      setStep(3);

      // Trigger success notification
      const notification = document.createElement('div');
      notification.className = 'payment-success-notification';
      notification.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3" style="z-index: 9999;">
          <i class="fas fa-check-circle me-2"></i>
          Payment Successful! Your order has been placed.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.remove();
      }, 5000);

      // Send order to backend
      const storedEmail = localStorage.getItem('userEmail');
      if (!storedEmail) {
        throw new Error('Please log in before placing an order.');
      }
      
      console.log('Creating order for email:', storedEmail);
      const response = await axios.post(apiUrl('/api/checkout'), {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        email: storedEmail,
        paymentMethod,
        status: 'confirmed'
      });
      console.log('Order created:', response.data);

    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Progress Bar */}
          <div className="progress mb-4" style={{ height: "2px" }}>
            <div 
              className="progress-bar bg-danger" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div className={`step ${step >= 1 ? 'text-danger' : ''}`}>Review Order</div>
            <div className={`step ${step >= 2 ? 'text-danger' : ''}`}>Payment</div>
            <div className={`step ${step >= 3 ? 'text-danger' : ''}`}>Confirmation</div>
          </div>

          {step === 1 && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">Review Your Order</h4>
                {cartItems.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">Quantity: {item.quantity}</small>
                    </div>
                    <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                  <h5>Total</h5>
                  <h5>₹{total.toFixed(2)}</h5>
                </div>
                <button 
                  className="btn btn-danger w-100 mt-3"
                  onClick={() => setStep(2)}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-4">Choose Payment Method</h4>
                <div className="mb-4">
                  <div className="payment-options">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="payment-method h-100">
                          <input
                            type="radio"
                            className="btn-check"
                            id="cashPayment"
                            name="paymentMethod"
                            value="cash"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4" htmlFor="cashPayment">
                            <i className="fas fa-money-bill-wave mb-2" style={{ fontSize: '2rem' }}></i>
                            <span>Cash Payment</span>
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="payment-method h-100">
                          <input
                            type="radio"
                            className="btn-check"
                            id="razorpayPayment"
                            name="paymentMethod"
                            value="razorpay"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4" htmlFor="razorpayPayment">
                            <div className="payment-icons mb-2">
                              <i className="fas fa-mobile-alt me-2" style={{ fontSize: '1.5rem' }}></i>
                              <i className="fas fa-credit-card me-2" style={{ fontSize: '1.5rem' }}></i>
                              <i className="fas fa-university" style={{ fontSize: '1.5rem' }}></i>
                            </div>
                            <span>Online Payment</span>
                            <small className="text-muted mt-1">(UPI, Card, NetBanking)</small>
                          </label>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3">
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <i className="fas fa-at text-danger"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter UPI ID (e.g., yourname@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'qr' && (
                      <div className="text-center mt-3">
                        <div className="qr-container p-4 bg-light rounded">
                          <div className="qr-code-wrapper">
                            <img
                              src="data:image/png;base64,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"
                              alt="QR Code for payment"
                              style={{ width: '200px', height: '200px' }}
                              className="img-fluid"
                            />
                          </div>
                          <p className="mt-3 mb-0">
                            <span className="badge bg-danger">Amount: ₹{total.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {paymentMethod === 'cash' ? (
                  <button
                    className="btn btn-danger w-100"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" />
                    ) : null}
                    Place Order (₹{total.toFixed(2)})
                  </button>
                ) : (
                  <div className="d-flex flex-column">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        localStorage.setItem('pendingPayment', JSON.stringify({
                          amount: total,
                          items: cartItems,
                          timestamp: new Date().getTime()
                        }));
                        setShowPaymentModal(true);
                      }}
                    >
                      <i className="fas fa-credit-card me-2"></i>
                      Proceed to Payment (₹{total.toFixed(2)})
                    </button>

                    {showPaymentModal && (
                      <>
                        <div 
                          className="modal fade show payment-modal" 
                          style={{ display: 'block' }} 
                          tabIndex="-1"
                        >
                          <div className="modal-dialog modal-dialog-centered modal-xl h-100 mx-auto my-0">
                            <div className="modal-content h-100">
                              <div className="modal-header bg-light py-3">
                                <h5 className="modal-title d-flex align-items-center">
                                  <i className="fas fa-lock text-danger me-2"></i>
                                  <span className="d-none d-sm-inline">Secure Payment</span>
                                  <span className="d-sm-none">Payment</span>
                                  <span className="badge bg-danger ms-2">₹{total.toFixed(2)}</span>
                                </h5>
                                <button 
                                  type="button" 
                                  className="btn-close"
                                  onClick={() => setShowPaymentModal(false)}
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body p-0 position-relative overflow-hidden">
                                <div className="payment-iframe-container">
                                  <iframe
                                    src="https://razorpay.me/@recgondasmartcanteen"
                                    className="payment-iframe"
                                    title="Payment Gateway"
                                    onLoad={(e) => {
                                      const iframe = e.target;
                                      const iframeWindow = iframe.contentWindow;

                                      // Check payment status periodically
                                      const checkPaymentStatus = setInterval(() => {
                                        try {
                                          // Look for success elements in the iframe
                                          if (iframeWindow && iframeWindow.document) {
                                            const successElement = iframeWindow.document.querySelector('.success-message, .payment-success');
                                            if (successElement) {
                                              clearInterval(checkPaymentStatus);
                                              setShowPaymentModal(false);
                                              handlePayment();
                                            }
                                          }
                                        } catch (error) {
                                          console.log('Checking payment status...');
                                        }
                                      }, 1000);

                                      // Clear interval when component unmounts
                                      return () => clearInterval(checkPaymentStatus);
                                    }}
                                  ></iframe>
                                </div>
                                <div className="enterprise-banner">
                                  <div className="enterprise-logo">
                                    <i className="fas fa-utensils"></i>
                                  </div>
                                  <div className="enterprise-name">
                                    Smart Canteen Enterprises
                                  </div>
                                  <div className="enterprise-verified">
                                    <i className="fas fa-check-circle"></i> Verified
                                  </div>
                                </div>
                                <div className="payment-overlay">
                                  <div className="payment-instructions">
                                    <p className="mb-2">
                                      <i className="fas fa-info-circle text-primary me-2"></i>
                                      Please enter the exact amount:
                                    </p>
                                    <h4 className="text-danger mb-0">₹{total.toFixed(2)}</h4>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer justify-content-between py-3">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  onClick={() => setShowPaymentModal(false)}
                                >
                                  <i className="fas fa-times me-2"></i>
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => {
                                    setShowPaymentModal(false);
                                    handlePayment();
                                  }}
                                >
                                  <i className="fas fa-check-circle me-2"></i>
                                  Payment Completed
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-backdrop fade show"></div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && orderId && (
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-4">
                  <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <h4 className="card-title mb-4">Order Confirmed!</h4>
                <div className="alert alert-success mb-4">
                  <strong>Order ID: {orderId}</strong>
                  <p className="mb-0">Please keep this for reference</p>
                </div>

                {timer > 0 && (
                  <div className="mb-4">
                    <h5>Estimated Time Remaining</h5>
                    <div className="display-4 text-danger mb-3">
                      {formatTime(timer)}
                    </div>
                    <p className="text-muted">Your order is being prepared</p>
                  </div>
                )}

                <button
                  className="btn btn-outline-danger"
                  onClick={() => navigate('/home')}
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .step {
          position: relative;
          color: #6c757d;
          font-weight: 500;
        }
        .step.text-danger {
          color: #dc3545 !important;
        }
        .card {
          border: none;
          border-radius: 15px;
        }
        .payment-method label {
          transition: all 0.3s ease;
          border: 2px solid #dee2e6;
        }
        .payment-method label:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.1);
        }
        .payment-method .btn-check:checked + label {
          background-color: #dc354510;
          border-color: #dc3545;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.2);
        }
        .payment-modal {
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
        }
        .enterprise-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          padding: 1rem;
          z-index: 1000;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          backdrop-filter: blur(8px);
        }
        .enterprise-logo {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #dc3545 0%, #e35d6a 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
          flex-shrink: 0;
        }
        .enterprise-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-right: auto;
        }
        .enterprise-verified {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #198754;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: rgba(25, 135, 84, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 100px;
          flex-shrink: 0;
        }
        .enterprise-verified i {
          font-size: 0.7rem;
        }
        .modal-content {
          border: none;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          height: calc(100vh - 2rem) !important;
          margin: 1rem;
        }
        .modal-header {
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          border-bottom: 1px solid #eee;
        }
        .modal-footer {
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          border-top: 1px solid #eee;
        }
        .payment-iframe-container {
          position: relative;
          width: 100%;
          height: calc(100vh - 180px);
          overflow: hidden;
        }
        .payment-iframe {
          width: 100%;
          height: 100%;
          border: none;
          transform: scale(1);
          transform-origin: 0 0;
        }
        .payment-overlay {
          position: fixed;
          top: 80px;
          right: 2rem;
          background: rgba(255, 255, 255, 0.98);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          z-index: 1050;
          animation: slideIn 0.3s ease-out;
          border: 2px solid rgba(220, 53, 69, 0.2);
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .payment-instructions {
          font-size: 1rem;
        }
        .payment-instructions p {
          color: #495057;
          font-weight: 500;
        }
        .payment-instructions h4 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }
        .badge {
          font-size: 0.9rem;
          padding: 6px 12px;
        }
        @media (max-width: 768px) {
          .modal-content {
            height: 100vh !important;
            margin: 0;
            border-radius: 0;
          }
          .payment-iframe-container {
            height: calc(100vh - 140px);
          }
          .payment-overlay {
            top: auto;
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
          }
          .modal-footer .btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
        @media (max-width: 576px) {
          .payment-instructions {
            font-size: 0.8rem;
          }
          .modal-footer {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Checkout;
