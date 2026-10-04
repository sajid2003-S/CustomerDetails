import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './InventoryCategory.css';

export default function InventoryCategory({
  category,
  defaultExpanded = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  if (!category) return null;

  const { name, count = 0, subcategories = [], isCustom = false } = category;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`inventory-category-wrapper ${isOpen ? 'open' : ''}`}>
      {/* Category Accordion Header */}
      <button
        type="button"
        className="category-accordion-header"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="header-left">
          <span className="category-title">{name}</span>
          <span className="category-count-badge">{count}</span>
        </div>
        <div className="header-chevron">
          {isOpen ? (
            <ChevronUp size={20} strokeWidth={2.5} />
          ) : (
            <ChevronDown size={20} strokeWidth={2.5} />
          )}
        </div>
      </button>

      {/* Accordion Content Panel */}
      {isOpen && (
        <div className="category-accordion-content">
          {subcategories.length === 0 || count === 0 ? (
            <p className="empty-category-text">No items selected in this category.</p>
          ) : isCustom ? (
            /* Custom Items Section */
            <div className="custom-items-grid">
              {subcategories[0]?.items?.map((item) => (
                <div key={item.id} className="custom-item-card">
                  <div className="item-main-info">
                    <span className="item-name">{item.name}</span>
                    {item.dimensions && (
                      <span className="item-meta">Dimensions: {item.dimensions}</span>
                    )}
                    {item.description && (
                      <span className="item-meta description-meta">{item.description}</span>
                    )}
                  </div>
                  <span className="item-qty">{item.qty}</span>
                </div>
              ))}
            </div>
          ) : (
            /* Standard Subcategories Multi-Column Grid */
            <div className="subcategories-grid">
              {subcategories.map((subcat) => (
                <div key={subcat.id} className="subcategory-column">
                  <h5 className="subcategory-heading">{subcat.name}</h5>
                  <div className="subcategory-items-list">
                    {subcat.items.map((item) => (
                      <div key={item.id} className="inventory-item-row">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          {item.details && (
                            <span className="item-type-detail">{item.details}</span>
                          )}
                        </div>
                        <span className="item-qty">{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
