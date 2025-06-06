import "../App.css";
import "./SideBar.css";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function SideBar({
  items = [],
  isOpen,
  onSelectItem,
  onAddItem,
  onRemoveItem,
  activeContent,
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
            <span className="icon" style={{ color: item.color || "#667eea" }}>
              {item.icon && typeof item.icon === "function" ? (
                <item.icon size={18} />
              ) : (
                item.icon
              )}
            </span>
            <span className="label">{item.name}</span>
            {item.deletable && (
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
        <span className="label">Add list</span>
      </button>
    </aside>
  );
}
