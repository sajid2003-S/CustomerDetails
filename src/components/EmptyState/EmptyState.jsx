import React from 'react';
import { PackageOpen } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({ message = 'No move requests found at the moment.' }) {
  return (
    <div className="empty-state-container">
      <div className="empty-icon-box">
        <PackageOpen size={48} strokeWidth={1.5} />
      </div>
      <h3 className="empty-title">No Moves Scheduled</h3>
      <p className="empty-message">{message}</p>
    </div>
  );
}
