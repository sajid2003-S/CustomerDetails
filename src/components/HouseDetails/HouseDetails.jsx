import React from 'react';
import { formatFloor, formatElevator, formatParkingDistance } from '../../utils/formatters';
import './HouseDetails.css';

export default function HouseDetails({ oldHouse = {}, newHouse = {}, onEdit }) {
  return (
    <div className="house-details-section">
      {/* Header with Title and Edit Button */}
      <div className="section-header-row">
        <h3 className="section-title">House Details</h3>
        <button
          type="button"
          className="btn-dark-action"
          onClick={onEdit}
        >
          Edit House Details
        </button>
      </div>

      {/* Existing House Details */}
      <div className="house-group">
        <h4 className="house-group-title">Existing House Details</h4>
        <div className="house-specs-grid">
          <div className="house-spec-col">
            <span className="house-spec-label">Floor No.</span>
            <span className="house-spec-value">{formatFloor(oldHouse.floorNo)}</span>
          </div>

          <div className="house-spec-col">
            <span className="house-spec-label">Elevator Available.</span>
            <span className="house-spec-value">{formatElevator(oldHouse.elevatorAvailability)}</span>
          </div>

          <div className="house-spec-col">
            <span className="house-spec-label">Distance from Elevator / Staircase to truck</span>
            <span className="house-spec-value">{formatParkingDistance(oldHouse.parkingDistance)}</span>
          </div>
        </div>
      </div>

      {/* New House Details */}
      <div className="house-group">
        <h4 className="house-group-title">New House Details</h4>
        <div className="house-specs-grid">
          <div className="house-spec-col">
            <span className="house-spec-label">Floor No.</span>
            <span className="house-spec-value">{formatFloor(newHouse.floorNo)}</span>
          </div>

          <div className="house-spec-col">
            <span className="house-spec-label">Elevator Available.</span>
            <span className="house-spec-value">{formatElevator(newHouse.elevatorAvailability)}</span>
          </div>

          <div className="house-spec-col">
            <span className="house-spec-label">Distance from Elevator / Staircase to truck</span>
            <span className="house-spec-value">{formatParkingDistance(newHouse.parkingDistance)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
