import React from 'react';
import {
  ArrowRight,
  Home,
  Boxes,
  MapPin,
  Calendar,
  Pencil,
  CheckSquare,
  AlertTriangle,
} from 'lucide-react';
import { formatMoveDate, formatPropertySize, formatDistance } from '../../utils/formatters';
import './MoveSummary.css';

export default function MoveSummary({ move, isExpanded, onToggleExpand }) {
  if (!move) return null;

  const {
    estimate_id = '',
    moving_from = '',
    moving_to = '',
    property_size = '',
    total_items = 0,
    distance = '',
    moving_on = '',
    move_date_flexible = 0,
    custom_status = 'Quotes Awaiting',
  } = move;

  const isFlexible = Number(move_date_flexible) === 1 || move_date_flexible === true || String(move_date_flexible).toLowerCase() === 'yes';

  return (
    <div className="move-summary-container">
      {/* Top Address Row */}
      <div className="summary-addresses-row">
        {/* From Address */}
        <div className="address-column from-column">
          <span className="address-label">From</span>
          <p className="address-text">{moving_from || 'Origin address not specified'}</p>
        </div>

        {/* Direction Arrow Badge */}
        <div className="direction-arrow-wrapper">
          <div className="direction-arrow-badge" title="Moving direction">
            <ArrowRight size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* To Address */}
        <div className="address-column to-column">
          <span className="address-label">To</span>
          <p className="address-text">{moving_to || 'Destination address not specified'}</p>
        </div>

        {/* Request ID */}
        <div className="request-id-column">
          <span className="request-label">Request#</span>
          <span className="request-id-value">{estimate_id}</span>
        </div>
      </div>

      {/* Middle Specs & Actions Row */}
      <div className="summary-specs-actions-row">
        {/* Left: Specs (House, Items, Distance, Date, Flexible) */}
        <div className="specs-group">
          {/* BHK Type */}
          <div className="spec-item" title="Property Size">
            <Home className="spec-icon" size={19} />
            <span className="spec-text">{formatPropertySize(property_size)}</span>
          </div>

          {/* Item Count */}
          <div className="spec-item" title="Total Items">
            <Boxes className="spec-icon" size={19} />
            <span className="spec-text">{total_items}</span>
          </div>

          {/* Distance */}
          <div className="spec-item" title="Distance">
            <MapPin className="spec-icon" size={19} />
            <span className="spec-text">{formatDistance(distance)}</span>
          </div>

          {/* Move Date & Edit */}
          <div className="spec-item date-spec-item" title="Move Date and Time">
            <Calendar className="spec-icon" size={19} />
            <span className="spec-text date-text">{formatMoveDate(moving_on)}</span>
            <button
              type="button"
              className="spec-inline-btn"
              title="Edit Move Date"
              aria-label="Edit Move Date"
            >
              <Pencil size={15} className="pencil-icon" />
            </button>
          </div>

          {/* Flexible Date Status */}
          <div className="spec-item flexible-spec-item">
            {isFlexible ? (
              <CheckSquare className="spec-icon check-icon" size={18} />
            ) : (
              <span className="custom-check-box active">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
            )}
            <span className="spec-text">Is flexible</span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="actions-group">
          <button
            type="button"
            className={`btn-view-details ${isExpanded ? 'active' : ''}`}
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'View Move Details' : 'View move details'}
          </button>

          <button
            type="button"
            className="btn-quotes-awaiting"
          >
            {custom_status || 'Quotes Awaiting'}
          </button>
        </div>
      </div>

      {/* Bottom Disclaimer Row */}
      <div className="summary-disclaimer-row">
        <AlertTriangle className="disclaimer-icon" size={17} />
        <span className="disclaimer-text">
          <strong>Disclaimer:</strong> Please update your move date before two days of shifting
        </span>
      </div>
    </div>
  );
}
