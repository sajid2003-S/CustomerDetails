import React, { useState } from 'react';
import { Truck, User, FileText, LogOut, Menu, X } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { id: 'my-moves', label: 'MY MOVES', icon: Truck },
  { id: 'my-profile', label: 'MY PROFILE', icon: User },
  { id: 'get-quote', label: 'GET QUOTE', icon: FileText },
  { id: 'logout', label: 'LOGOUT', icon: LogOut },
];

export default function Sidebar({ activeNav = 'my-moves', onNavChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (id) => {
    if (onNavChange) onNavChange(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="mobile-brand">
          <Truck className="brand-icon" size={22} />
          <span className="brand-text">My Moves</span>
        </div>
      </div>

      {/* Overlay for mobile drawer */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar-container ${mobileOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav" aria-label="Main Navigation">
          <ul className="sidebar-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id} className="sidebar-item-wrapper">
                  <button
                    type="button"
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelect(item.id)}
                  >
                    <span className="icon-wrapper">
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <span className="sidebar-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
