import { Component } from 'react';
import type { ReactNode } from 'react';

interface IErrorBoundaryProps {
  readonly children: ReactNode;
}

interface IErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6">
          <div className="max-w-md text-center">
            <h1 className="font-display font-black text-4xl text-primary-400 mb-4">
              Oops! Something went wrong 💥
            </h1>
            <p className="text-light-muted dark:text-dark-muted mb-6">
              An unexpected error occurred. Try refreshing the page or contact me directly.
            </p>
            <button
              onClick={(): void => {
                window.location.reload();
              }}
              className="px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-primary-400 text-white hover:bg-primary-300 transition-colors"
            >
              Reload Page
            </button>
            {this.state.error !== null && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-light-muted dark:text-dark-muted font-body">
                  Error details
                </summary>
                <pre className="mt-2 p-4 bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border rounded-xl text-xs overflow-x-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
