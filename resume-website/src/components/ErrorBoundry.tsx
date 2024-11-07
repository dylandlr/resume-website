"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🚨 Component Error:", {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-slate-900/30 border border-red-500/20 rounded-lg p-8 text-center backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white/90 mb-3">
            Component Error
          </h3>
          <p className="text-zinc-400 mb-6">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
