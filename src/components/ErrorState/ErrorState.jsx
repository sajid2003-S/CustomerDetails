import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorState.css';

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="error-state-container" role="alert">
      <div className="error-icon-box">
        <AlertCircle size={40} />
      </div>
      <h3 className="error-title">Oops! Failed to load moves</h3>
      <p className="error-message">
        {error || 'Unable to fetch your move details at this moment. Please check your network connection and try again.'}
      </p>
      {onRetry && (
        <button type="button" className="btn-retry" onClick={onRetry}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
