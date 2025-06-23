// =============================
// TopBar Component
// =============================
import React from "react";
import "../App.css";
import "./TopBar.css";

/**
 * TopBar renders the fixed header with the menu toggle and title.
 * @param {Object} props
 * @param {Function} props.onToggleSidebar - Handler to open/close the sidebar
 */
export default function TopBar({ onToggleSidebar }) {
  return (
    <header className="topbar">
      {/* Hamburger menu button (visible on mobile) */}
      <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Open sidebar">
        &#9776;
      </button>
      {/* App title */}
      <div className="topbar-title">Todo List</div>
      {/* Navigation placeholder (for future nav items) */}
      <nav className="topbar-nav">{/* nav items */}</nav>
    </header>
  );
}
