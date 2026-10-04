import React, { useState } from 'react';
import MoveSummary from '../MoveSummary/MoveSummary';
import MoveDetails from '../MoveDetails/MoveDetails';
import './MoveCard.css';

export default function MoveCard({
  move,
  isExpanded: controlledExpanded,
  onToggleExpand: controlledOnToggle,
}) {
  // Support either controlled or uncontrolled expansion
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  if (!move) return null;

  return (
    <article className={`move-card-item ${isExpanded ? 'is-expanded' : ''}`}>
      {/* Move Summary View */}
      <MoveSummary
        move={move}
        isExpanded={isExpanded}
        onToggleExpand={handleToggle}
      />

      {/* Move Details Expanded View */}
      {isExpanded && <MoveDetails move={move} />}

      {/* Horizontal Divider */}
      <div className="move-card-divider" />
    </article>
  );
}
