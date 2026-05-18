import React from 'react';

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center py-4">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
