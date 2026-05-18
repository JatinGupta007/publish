import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center py-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <i className="fas fa-exclamation-circle text-danger fa-3x mb-3"></i>
              <h3 className="mb-3">Oops! Something went wrong</h3>
              <p className="text-muted mb-3">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
              <button
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                <i className="fas fa-redo me-2"></i>
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
