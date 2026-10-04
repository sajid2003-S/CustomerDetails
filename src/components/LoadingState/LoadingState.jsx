import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingState.css';

export default function LoadingState() {
  return (
    <div className="loading-state-container" aria-busy="true" aria-live="polite">
      <div className="spinner-wrapper">
        <Loader2 className="loading-spinner" size={36} />
        <span className="loading-text">Loading your moves...</span>
      </div>

      {/* Shimmer Placeholder Cards */}
      <div className="skeleton-list">
        {[1, 2, 3].map((key) => (
          <div key={key} className="skeleton-card">
            <div className="skeleton-row-top">
              <div className="skeleton-bar bar-address" />
              <div className="skeleton-circle" />
              <div className="skeleton-bar bar-address" />
              <div className="skeleton-bar bar-req" />
            </div>
            <div className="skeleton-row-middle">
              <div className="skeleton-bar bar-chip" />
              <div className="skeleton-bar bar-chip" />
              <div className="skeleton-bar bar-chip" />
              <div className="skeleton-bar bar-btn" />
            </div>
            <div className="skeleton-bar bar-bottom" />
          </div>
        ))}
      </div>
    </div>
  );
}
