import "../App.css";
import "./DetailsBar.css";
import { FiX, FiTrash2, FiCheck, FiCircle, FiStar } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function DetailsBar({
  isOpen,
  task,
  onClose,
  onRemoveTask,
  onToggleComplete,
  onToggleImportant,
  onEditTask,
}) {
  const [editingText, setEditingText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (task) {
      setEditingText(task.text);
    }
  }, [task]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (!isOpen || !task) return null;

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    if (editingText.trim() !== task.text) {
      onEditTask(task.id, editingText.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTextBlur();
    } else if (e.key === "Escape") {
      setEditingText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <aside className={`detailsBar ${isOpen ? "open" : ""}`}>
      <div className="details-content">
        <div className="details-header">
          {/* Checkbox */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onToggleComplete(task.id);
            }}
            className="toggle-complete"
            aria-label={
              task.completed ? "Mark as not completed" : "Mark as completed"
            }
          >
            {task.completed ? <FiCheck size={20} /> : <FiCircle size={20} />}
          </button>

          {/* Task Text */}
          {isEditing ? (
            <input
              type="text"
              ref={inputRef}
              value={editingText}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onKeyDown={handleKeyDown}
              className="details-task-input"
            />
          ) : (
            <span
              className="details-task-text"
              onClick={handleTextClick}
              style={{ cursor: "text" }}
            >
              {task.text}
            </span>
          )}

          {/* Importance Toggle */}
          <button
            type="button"
            onClick={() => onToggleImportant(task.id)}
            className={task.important ? "toggle-important" : "toggle-normal"}
            aria-label={
              task.important ? "Mark as not important" : "Mark as important"
            }
          >
            <FiStar size={20} fill={task.important ? "currentColor" : "none"} />
          </button>
        </div>
        <button className="details-button">Add to my day</button>
        <button className="details-button">Add due Date</button>
        <button className="details-button">Add due Time</button>
      </div>

      <div className="detail-bottom">
        {/* Close bar*/}
        <button
          type="button"
          className="detail-close-btn"
          onClick={onClose}
          aria-label="Close details"
        >
          <FiX size={20} />
        </button>
        {/* Delete*/}
        <button
          type="button"
          onClick={() => onRemoveTask(task.id)}
          className="detail-delete-btn"
          aria-label="Delete task"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </aside>
  );
}
