import "../App.css";
import "./SideBar.css";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function SideBar({
  items = [],
  isOpen,
  onSelectItem,
  onAddItem,
  onRemoveItem,
  activeContent,
  onOpenClose,
}) {
  const handleSelect = (id) => {
    if (onSelectItem) onSelectItem(id);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={activeContent === item.id ? "selected" : ""}
            onClick={() => handleSelect(item.id)}
            style={{ "--accent": item.color || "#667eea" }}
          >
            {/* ICONA */}
            <span className="icon" style={{ color: item.color || "#667eea" }}>
              {item.icon && typeof item.icon === "function" ? (
                <item.icon size={18} />
              ) : (
                item.icon
              )}
            </span>
            {/* TITOLO */}
            {isOpen && <span className="label">{item.name}</span>}
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
      <button onClick={onAddItem} className="add-btn">
        <span className="icon">
          <FiPlus />
        </span>
        {isOpen && <span className="label">Add list</span>}
      </button>
      <button
        className="openClose-btn"
        onClick={onOpenClose}
        aria-label="Open Close sidebar"
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
    </aside>
  );
}
