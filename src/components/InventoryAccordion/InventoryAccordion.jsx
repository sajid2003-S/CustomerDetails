import React from 'react';
import InventoryCategory from '../InventoryCategory/InventoryCategory';
import { parseInventoryData } from '../../utils/inventoryHelper';
import './InventoryAccordion.css';

export default function InventoryAccordion({ itemsData, onEditInventory }) {
  const categories = parseInventoryData(itemsData);

  return (
    <div className="inventory-details-section">
      {/* Section Header */}
      <div className="section-header-row">
        <h3 className="section-title">Inventory Details</h3>
        <button
          type="button"
          className="btn-dark-action"
          onClick={onEditInventory}
        >
          Edit Inventory
        </button>
      </div>

      {/* Accordion Categories List */}
      <div className="inventory-accordion-list">
        {categories.length === 0 ? (
          <p className="no-inventory-text">No inventory details available for this move.</p>
        ) : (
          categories.map((cat, index) => (
            <InventoryCategory
              key={cat.id || index}
              category={cat}
              defaultExpanded={index === 0}
            />
          ))
        )}
      </div>
    </div>
  );
}
