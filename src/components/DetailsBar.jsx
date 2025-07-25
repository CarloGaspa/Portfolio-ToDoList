// =============================
// DetailsBar Component
// =============================
import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "./DetailsBar.css";
import {
  FiX,
  FiTrash2,
  FiCheck,
  FiCircle,
  FiStar,
  FiSun,
  FiCalendar,
  FiClock,
  FiEdit3,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiLeftArrow } from "react-icons/bi";

/**
 * Renders the details sidebar for a selected task, with editing, date/time, and note controls.
 * @param {Object} props
 * @param {boolean} props.isMobile - Whether the UI is in mobile mode
 * @param {boolean} props.isOpen - Whether the details bar is open
 * @param {Object} props.task - The selected task object
 * @param {Function} props.onClose - Handler to close the details bar
 * @param {Function} props.onRemoveTask - Handler to remove the task
 * @param {Function} props.onToggleComplete - Handler to toggle task completion
 * @param {Function} props.onToggleImportant - Handler to toggle task importance
 * @param {Function} props.onUpdateTask - Handler to update task fields
 */
export default function DetailsBar({
  isMobile,
  isOpen,
  task,
  onClose,
  onRemoveTask,
  onToggleComplete,
  onToggleImportant,
  onUpdateTask,
}) {
  // ===== State for editing fields and UI controls =====
  const [editingText, setEditingText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [newTaskDate, setNewTaskDate] = useState(null);
  const [newTaskTime, setNewTaskTime] = useState(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const inputRef = useRef(null);

  // ===== Effect: Sync state with selected task =====
  useEffect(() => {
    if (task) {
      setEditingText(task.text);
      if (task.date) {
        setNewTaskDate(new Date(task.date));
      }
      if (task.time) {
        // Convert "HH:mm" to Date object
        const [hours, minutes] = task.time.split(":");
        const timeDate = new Date();
        timeDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        setNewTaskTime(timeDate);
      } else {
        setNewTaskTime(null); // Reset if no time
      }
    }
  }, [task]);

  // ===== Effect: Focus input when editing =====
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // ===== Early return if not open or no task =====
  if (!isOpen || !task) return null;

  // ===== Handlers for editing and updating fields =====
  const handleTextClick = () => {
    setIsEditing(true);
  };
  const handleTextChange = (e) => {
    setEditingText(e.target.value);
  };
  const handleTextBlur = () => {
    setIsEditing(false);
    if (editingText.trim() !== task.text) {
      onUpdateTask(task.id, { text: editingText.trim() });
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
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    onUpdateTask(task.id, { date: formattedDate });
    setNewTaskDate(date);
    setShowDatePicker(false);
  };
  const handleTimeChange = (time) => {
    if (!time) {
      // If time is removed
      onUpdateTask(task.id, { time: null });
      setNewTaskTime(null);
      setShowTimePicker(false);
      return;
    }
    // Format time as "HH:mm"
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    onUpdateTask(task.id, { time: formattedTime });
    setNewTaskTime(time); // Save Date object
    setShowTimePicker(false);
  };
  const handleRemoveDate = () => {
    onUpdateTask(task.id, { date: null });
    setNewTaskDate(null);
  };
  const handleRemoveTime = () => {
    onUpdateTask(task.id, { time: null });
    setNewTaskTime(null);
  };
  const handleAddToMyDay = () => {
    const today = new Date();
    onUpdateTask(task.id, { date: formatDate(today) });
    setNewTaskDate(today);
  };

  // =============================
  // Render DetailsBar Layout
  // =============================
  return (
    <aside
      className={`detailsBar ${isOpen ? "open" : ""} 
      ${isMobile ? "mobile" : ""}`}
    >
      <div className="details-content">
        <div className="details-header">
          {/* Complete/Uncomplete Button */}
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

          {/* Task Text (editable) */}
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
            <FiStar
              style={{ marginRight: "10px" }}
              fill={task.important ? "currentColor" : "none"}
              size={20}
            />
          </button>
        </div>

        {/* Due Date Section */}
        <div className="details-section">
          <FiCalendar size={20} className="details-icon" />
          {!task.date ? (
            <button
              className="edit-button"
              onClick={() => setShowDatePicker(true)}
            >
              Add due date
            </button>
          ) : (
            <div className="date-time-container">
              <button
                className="edit-button"
                onClick={() => setShowDatePicker(true)}
              >
                <span
                  style={{
                    color: isPastDate(task.date, task.time)
                      ? "rgb(255,56,55)"
                      : "",
                    fontWeight: isPastDate(task.date, task.time)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {formatTaskDate(task.date)}
                </span>
              </button>
              <button className="details-remove" onClick={handleRemoveDate}>
                <FiX size={16} />
              </button>
            </div>
          )}
        </div>
        {showDatePicker && (
          <>
            <div
              className="date-picker-overlay"
              onClick={() => setShowDatePicker(false)}
            />
            <div className="date-picker-container">
              <DatePicker
                selected={newTaskDate || new Date()}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                inline
              />
            </div>
          </>
        )}

        {/* Due Time Section */}
        <div className="details-section">
          <FiClock size={20} className="details-icon" />
          {!task.time ? (
            <button
              className="edit-button"
              onClick={() => setShowTimePicker(true)}
            >
              Add due time
            </button>
          ) : (
            <div className="date-time-container">
              <button
                className="edit-button"
                onClick={() => setShowTimePicker(true)}
              >
                <span
                  style={{
                    color: isPastDate(task.date, task.time)
                      ? "rgb(255,56,55)"
                      : "",
                    fontWeight: isPastDate(task.date, task.time)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {task.time}
                </span>
              </button>
              <button className="details-remove" onClick={handleRemoveTime}>
                <FiX size={16} />
              </button>
            </div>
          )}
        </div>
        {showTimePicker && (
          <>
            <div
              className="date-picker-overlay"
              onClick={() => setShowTimePicker(false)}
            />
            <div className="date-picker-container">
              <DatePicker
                selected={newTaskTime || new Date()}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                inline
              />
            </div>
          </>
        )}

        {/* Add to My Day Section (optional) */}
        <div className="details-section">
          <FiSun size={20} className="details-icon" />
          {task.date && isToday(new Date(task.date)) ? (
            <button className="edit-button" onClick={handleRemoveDate}>
              Remove from My Day
            </button>
          ) : (
            <button className="edit-button" onClick={handleAddToMyDay}>
              Add to My Day
            </button>
          )}
        </div>

        {/* NOTE */}
        <div className="details-section-note">
          <FiEdit3 size={20} className="details-icon" />{" "}
          <textarea
            value={isEditingNote ? currentNote : task.note || ""}
            onChange={(e) => setCurrentNote(e.target.value)}
            onBlur={() => {
              onUpdateTask(task.id, { note: currentNote });
              setIsEditingNote(false);
            }}
            onFocus={() => {
              setCurrentNote(task.note || "");
              setIsEditingNote(true);
            }}
            placeholder="Add notes..."
            className="details-note-input"
            rows={4}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------ */}

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

function formatTaskDate(dateStr) {
  const taskDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let datePart = "";

  const taskDateOnly = new Date(taskDate);
  taskDateOnly.setHours(0, 0, 0, 0);

  if (taskDateOnly.getTime() === today.getTime()) {
    datePart = "Today";
  } else if (taskDateOnly.getTime() === yesterday.getTime()) {
    datePart = "Yesterday";
  } else if (taskDateOnly.getTime() === tomorrow.getTime()) {
    datePart = "Tomorrow";
  } else {
    const day = String(taskDate.getDate()).padStart(2, "0");
    const month = String(taskDate.getMonth() + 1).padStart(2, "0");
    const year = String(taskDate.getFullYear()).slice(-2);
    datePart = `${day}/${month}/${year}`;
  }
  return datePart;
}

function isPastDate(dateStr, timeStr) {
  if (!dateStr && !timeStr) return false;
  const now = new Date();
  let taskDate;
  if (dateStr && timeStr) {
    taskDate = new Date(`${dateStr}T${timeStr}`);
  } else if (dateStr) {
    taskDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today;
  } else {
    const todayStr = now.toISOString().split("T")[0];
    taskDate = new Date(`${todayStr}T${timeStr}`);
  }
  return taskDate < now;
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
