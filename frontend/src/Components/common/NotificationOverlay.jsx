import React from 'react';

export const NotificationOverlay = ({ type = 'success', message, onClose }) => {
  return (
    <>
      <div className="notification-overlay show">
        <div className={`notification-content ${type}`}>
          <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
          {message}
          {onClose && (
            <button className="btn-close" onClick={onClose} aria-label="Close"></button>
          )}
        </div>
      </div>

      <style jsx>{`
        .notification-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          padding: 1rem;
          z-index: 9999;
          pointer-events: none;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .notification-overlay.show {
          opacity: 1;
        }

        .notification-content {
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          pointer-events: auto;
        }

        .notification-content.success {
          background-color: #28a745;
        }

        .notification-content.error {
          background-color: #dc3545;
        }

        .notification-content.warning {
          background-color: #ffc107;
          color: #212529;
        }

        .btn-close {
          margin-left: 1rem;
          opacity: 0.8;
        }

        .btn-close:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default NotificationOverlay;
