import "../App.css";
import "./DetailsBar.css";
import { FiX, FiTrash2 } from "react-icons/fi";

export default function DetailsBar({ isOpen, item, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <aside className={`detailsBar ${isOpen ? "open" : ""}`}>
      <button
        className="close-btn"
        onClick={onClose}
        aria-label="Close details"
      >
        <FiX size={20} />
      </button>
      <div className="details-content">
        <p>
          <strong>{item.text}</strong>
        </p>
        <p>
          <strong>Data:</strong> {item.date || "Nessuna data"}
        </p>
      </div>
    </aside>
  );
}
