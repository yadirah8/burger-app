import React,{Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        errorMessage: ''
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { errorMessage: error.toString()};
    }
  
    componentDidCatch(error, info) {
      // You can also log the error to an error reporting service
      this.logErrorToMyService(error.toString(), info.componentStack);
    }
  
    render() {
      if (this.state.errorMessage) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;