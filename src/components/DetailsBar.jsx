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
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiLeftArrow } from "react-icons/bi";

export default function DetailsBar({
  isOpen,
  task,
  onClose,
  onRemoveTask,
  onToggleComplete,
  onToggleImportant,
  onUpdateTask,
}) {
  const [editingText, setEditingText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [newTaskDate, setNewTaskDate] = useState(null);
  const [newTaskTime, setNewTaskTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (task) {
      setEditingText(task.text);
      if (task.date) {
        setNewTaskDate(new Date(task.date));
      }
      if (task.time) {
        // Converti "HH:mm" in un oggetto Date
        const [hours, minutes] = task.time.split(":");
        const timeDate = new Date();
        timeDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        setNewTaskTime(timeDate);
      } else {
        setNewTaskTime(null); // Resetta se non c'è un orario
      }
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
    return d.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    onUpdateTask(task.id, { date: formattedDate });
    setNewTaskDate(date);
    setShowDatePicker(false);
  };

  const handleTimeChange = (time) => {
    if (!time) {
      // Se l'orario viene rimosso
      onUpdateTask(task.id, { time: null });
      setNewTaskTime(null);
      setShowTimePicker(false);
      return;
    }

    // Formatta l'orario in "HH:mm" (senza secondi)
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    onUpdateTask(task.id, { time: formattedTime });
    setNewTaskTime(time); // Salva l'oggetto Date (non la stringa)
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

        {/* DATE */}
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
                    color: isPastDate(task.date) ? "rgb(255,56,55)" : "",
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

        {/* TIME */}
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
                <span>{task.time}</span>
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

        {/* ADD TO MY DAY */}
        <div className="details-section">
          <FiSun size={20} className="details-icon" />
          <button className="edit-button" onClick={handleAddToMyDay}>
            Add to My Day
          </button>
        </div>
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

function isPastDate(dateStr) {
  if (!dateStr) return false;

  const taskDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDateOnly = new Date(taskDate);
  taskDateOnly.setHours(0, 0, 0, 0);

  return taskDateOnly < today;
}
