import React from 'react';

const showNotification = (type, message) => {
  const notification = document.createElement('div');
  notification.className = 'notification-overlay';
  notification.innerHTML = `
    <div class="notification-content ${type}">
      <div class="d-flex align-items-center gap-3">
        <div class="notification-icon">
          <i class="fas fa-${
            type === 'success' ? 'check-circle' : 
            type === 'warning' ? 'exclamation-triangle' : 
            type === 'error' ? 'times-circle' : 
            'info-circle'
          }"></i>
        </div>
        <div class="notification-message">
          ${message}
        </div>
      </div>
    </div>
    <style>
      .notification-overlay {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        justify-content: center;
        animation: slideDown 0.5s ease-out;
      }
      
      .notification-content {
        background: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        color: #333;
        min-width: 300px;
        max-width: 90vw;
      }
      
      .notification-content.success {
        border-left: 4px solid #28a745;
      }
      
      .notification-content.error {
        border-left: 4px solid #dc3545;
      }
      
      .notification-content.warning {
        border-left: 4px solid #ffc107;
      }
      
      .notification-icon {
        font-size: 1.5rem;
      }
      
      .notification-content.success .notification-icon {
        color: #28a745;
      }
      
      .notification-content.error .notification-icon {
        color: #dc3545;
      }
      
      .notification-content.warning .notification-icon {
        color: #ffc107;
      }
      
      .notification-message {
        font-size: 1rem;
        font-weight: 500;
      }
      
      @keyframes slideDown {
        from {
          transform: translate(-50%, -100%);
          opacity: 0;
        }
        to {
          transform: translate(-50%, 0);
          opacity: 1;
        }
      }
    </style>
  `;
  document.body.appendChild(notification);

  document.body.appendChild(notification);

  // Add slide-up animation before removing
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.5s ease-out forwards';
  }, 4500);

  // Remove notification after animation
  setTimeout(() => {
    notification.remove();
  }, 5000);
};

export default showNotification;

// Add the slide-up animation to the document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
