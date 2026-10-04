import React from 'react';
import HouseDetails from '../HouseDetails/HouseDetails';
import InventoryAccordion from '../InventoryAccordion/InventoryAccordion';
import './MoveDetails.css';

export default function MoveDetails({ move }) {
  if (!move) return null;

  const {
    old_house_additional_info = '',
    new_house_additional_info = '',
    old_floor_no = '0',
    new_floor_no = '0',
    old_elevator_availability = 'No',
    new_elevator_availability = 'No',
    old_parking_distance = '0 meters',
    new_parking_distance = '0 meters',
    items = {},
  } = move;

  const additionalInfoText =
    old_house_additional_info ||
    new_house_additional_info ||
    'Test Data';

  const oldHouse = {
    floorNo: old_floor_no,
    elevatorAvailability: old_elevator_availability,
    parkingDistance: old_parking_distance,
  };

  const newHouse = {
    floorNo: new_floor_no,
    elevatorAvailability: new_elevator_availability,
    parkingDistance: new_parking_distance,
  };

  return (
    <div className="move-details-expanded-panel">
      {/* 1. Additional Information Section */}
      <section className="details-subpanel additional-info-section">
        <div className="section-header-row">
          <h3 className="section-title">Additional Information</h3>
          <button
            type="button"
            className="btn-dark-action"
          >
            Edit Additional Info
          </button>
        </div>
        <p className="additional-info-text">{additionalInfoText}</p>
      </section>

      {/* 2. House Details Section */}
      <section className="details-subpanel">
        <HouseDetails
          oldHouse={oldHouse}
          newHouse={newHouse}
        />
      </section>

      {/* 3. Inventory Details Section */}
      <section className="details-subpanel">
        <InventoryAccordion
          itemsData={items}
        />
      </section>
    </div>
  );
}
