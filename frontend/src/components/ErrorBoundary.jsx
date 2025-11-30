import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log minimal info to console; could integrate with reporting service
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Algo deu errado.</h2>
          <p>Tente recarregar a página. Se o problema persistir, verifique o backend.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
