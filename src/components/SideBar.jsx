import { TheaterIcon } from "lucide-react";
import "../App.css";
import "./SideBar.css";
import { useState, useEffect } from "react";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function SideBar({
  isMobile,
  items = [],
  isOpen,
  onSelectItem,
  onAddItem,
  onRemoveItem,
  activeContent,
  onOpenClose,
  onCloseDetail,
}) {
  const handleSelect = (id) => {
    if (onSelectItem) onSelectItem(id);
  };

  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Ritardo di 50ms per assicurarsi che la sidebar sia completamente aperta prima dell'animazione
      const timer = setTimeout(() => setShowLabels(true), 0);
      return () => clearTimeout(timer);
    } else {
      setShowLabels(false);
    }
  }, [isOpen]);

  if (isMobile && isOpen) {
    onOpenClose();
  }

  return (
    <aside className={`sidebar ${isOpen ? "open" : "shorted"}`}>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={activeContent === item.id ? "selected" : ""}
            onClick={() => {
              onCloseDetail();
              handleSelect(item.id);
            }}
            style={{ "--accent": item.color || "#667eea" }}
          >
            {/* ICON */}
            <span className="icon" style={{ color: item.color || "#667eea" }}>
              {item.icon && typeof item.icon === "function" ? (
                <item.icon size={18} />
              ) : (
                item.icon
              )}
            </span>
            {/* TITLE */}
            {isOpen && (
              <span className={`label ${showLabels ? "show" : ""}`}>
                {item.name}
              </span>
            )}
            {isOpen && item.deletable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onRemoveItem) onRemoveItem(item.id);
                }}
                className="delete-btn"
              >
                <FiTrash2 size={14} />
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* ADD LIST */}
      <button
        onClick={() => {
          onCloseDetail(), onAddItem();
        }}
        className="add-btn"
      >
        <span className="icon">
          <FiPlus />
        </span>
        {isOpen && (
          <span className={`label ${showLabels ? "show" : ""}`}>Add list</span>
        )}
      </button>
      {/* SHORTED */}
      {!isMobile && (
        <button
          className="openClose-btn"
          onClick={onOpenClose}
          aria-label="Open Close sidebar"
        >
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>
      )}
    </aside>
  );
}
