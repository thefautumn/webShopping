import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để hiển thị fallback UI sau khi gặp lỗi
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Bạn có thể ghi log lỗi vào dịch vụ log, như Sentry
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Bạn có thể render bất kỳ UI dự phòng nào
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
