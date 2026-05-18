import React, { useState, useEffect } from 'react';

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  
  const handleForward = (message) => {
    setSelectedMessage(message);
    setShowForwardModal(true);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleArchive = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${messageId}/archive`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to archive message');
      }

      // Update messages list
      setMessages(messages.filter(msg => msg._id !== messageId));
      showNotification('success', 'Message archived successfully');
    } catch (error) {
      console.error('Error archiving message:', error);
      showNotification('error', 'Failed to archive message');
    }
  };

  const handleReply = (email, subject) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${subject}&body=Dear Customer,%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards,%0D%0AThe Smart Canteen Team`;
    window.location.href = mailtoLink;
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark message as read');
      }

      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
      showNotification('success', 'Message marked as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      showNotification('error', 'Failed to mark message as read');
    }
  };

  const showNotification = (type, message) => {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed bottom-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchTerm === '' || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Customer Messages</h2>
          <p className="text-muted">View and manage customer feedback and inquiries</p>
        </div>
        <div className="d-flex gap-2">
          <input
            type="search"
            className="form-control"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchMessages}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading messages...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          {error}
        </div>
      ) : (
        <div className="row g-4">
          {filteredMessages.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h4>No Messages Found</h4>
                <p className="text-muted">There are no messages matching your search.</p>
              </div>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div key={message._id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title mb-1">{message.subject}</h5>
                        <p className="text-muted mb-0">
                          From: {message.name} ({message.email})
                        </p>
                      </div>
                      <small className="text-muted mt-2 mt-md-0">
                        <i className="far fa-clock me-1"></i>
                        {formatDate(message.createdAt)}
                      </small>
                    </div>
                    <p className="card-text mb-0">{message.message}</p>
                  </div>
                  <div className="card-footer bg-light d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      {!message.isRead && (
                        <span className="badge bg-primary me-2">New</span>
                      )}
                      <small className="text-muted">
                        ID: {message._id?.slice(-6)}
                      </small>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleReply(message.email, message.subject)}
                        title="Reply to message"
                      >
                        <i className="fas fa-reply me-2"></i>Reply
                      </button>
                      {!message.isRead && (
                        <button 
                          className="btn btn-sm btn-outline-success"
                          onClick={() => handleMarkAsRead(message._id)}
                          title="Mark as read"
                        >
                          <i className="fas fa-check me-2"></i>Mark as Read
                        </button>
                      )}
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleArchive(message._id)}
                        title="Archive message"
                      >
                        <i className="fas fa-archive me-2"></i>Archive
                      </button>
                      <div className="dropdown">
                        <button 
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          More Actions
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button 
                              className="dropdown-item"
                              onClick={() => {
                                setSelectedMessage(message);
                                setShowActionModal(true);
                              }}
                            >
                              <i className="fas fa-eye me-2"></i>View Details
                            </button>
                          </li>
                          <li>
                            <button 
                              className="dropdown-item"
                              onClick={() => handleForward(message)}
                            >
                              <i className="fas fa-forward me-2"></i>Forward
                            </button>
                          </li>
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <button 
                              className="dropdown-item text-danger"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this message?')) {
                                  handleArchive(message._id);
                                }
                              }}
                            >
                              <i className="fas fa-trash-alt me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedMessage && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowActionModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="fw-bold">From:</label>
                  <p>{selectedMessage.name} ({selectedMessage.email})</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Subject:</label>
                  <p>{selectedMessage.subject}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Message:</label>
                  <p className="white-space-pre-line">{selectedMessage.message}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Received:</label>
                  <p>{formatDate(selectedMessage.createdAt)}</p>
                </div>
                <div className="mb-3">
                  <label className="fw-bold">Status:</label>
                  <p>{selectedMessage.isRead ? 'Read' : 'Unread'}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowActionModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      {/* Forward Modal */}
      {showForwardModal && selectedMessage && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forward Message</h5>
                <button type="button" className="btn-close" onClick={() => setShowForwardModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="forwardEmail" className="form-label">Forward to:</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="forwardEmail" 
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Original Message:</label>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">From: {selectedMessage.name}</h6>
                      <h5 className="card-title">{selectedMessage.subject}</h5>
                      <p className="card-text">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForwardModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  const email = document.getElementById('forwardEmail').value;
                  if (email) {
                    window.location.href = `mailto:${email}?subject=Fwd: ${selectedMessage.subject}&body=---------- Forwarded message ----------%0D%0AFrom: ${selectedMessage.name} <${selectedMessage.email}>%0D%0ADate: ${formatDate(selectedMessage.createdAt)}%0D%0ASubject: ${selectedMessage.subject}%0D%0A%0D%0A${selectedMessage.message}`;
                    setShowForwardModal(false);
                  }
                }}>
                  Forward
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      <style jsx>{`
        .card {
          transition: all 0.3s ease;
          border: none;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }

        .card-title {
          color: #2c3e50;
          font-weight: 600;
        }

        .card-text {
          color: #34495e;
          white-space: pre-line;
        }

        .btn-sm {
          padding: 0.4rem 1rem;
        }

        @media (max-width: 768px) {
          .container-fluid {
            padding: 1rem !important;
          }

          .card-body {
            padding: 1rem;
          }

          .btn-sm {
            width: 100%;
            margin: 0.25rem 0;
          }

          .card-footer {
            flex-direction: column;
            gap: 0.5rem;
          }

          .card-footer .btn {
            width: 100%;
          }
        }

        /* Smooth animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card {
          animation: fadeIn 0.3s ease-out;
        }

        .white-space-pre-line {
          white-space: pre-line;
        }

        .modal {
          background: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .dropdown-item {
          cursor: pointer;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        
        .dropdown-item i {
          width: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default MessagesPage;
