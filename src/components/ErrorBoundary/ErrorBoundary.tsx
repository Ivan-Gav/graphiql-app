import { Component, ReactNode } from 'react';
import Fallback from 'src/pages/Fallback/Fallback';

type EBProps = {
  fallback?: ReactNode;
  children?: ReactNode;
};

type EBState = {
  hasError: boolean;
  errorMessage: string;
};

class ErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error) {
    console.log(`Following error has occured: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return <Fallback errorMessage={this.state.errorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
