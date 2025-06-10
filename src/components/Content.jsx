import "../App.css";
import "./Content.css";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiCheck, FiCircle, FiStar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Content({
  activeContent,
  tasks = [],
  onSelectTask,
  onAddTask,
  onRemoveTask,
  onToggleComplete,
  onToggleImportant,
  currentList,
  activeTask,
}) {
  const [newTaskText, setnewTaskText] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(null);
  const [newTaskTime, setNewTaskTime] = useState(null);
  const [newTaskImportant, setNewTaskImportant] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      // Format date consistently (YYYY-MM-DD)
      const formattedDate = newTaskDate
        ? new Date(newTaskDate).toISOString().split("T")[0]
        : null;

      // Format time consistently (HH:MM AM/PM)
      const formattedTime = newTaskTime
        ? new Date(newTaskTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : null;

      let isImportant = newTaskImportant;
      let taskDate = formattedDate;
      if (activeContent.id === "important") {
        isImportant = true;
      }
      if (activeContent.id === "myday") {
        if (!formattedDate) {
          const today = new Date();
          taskDate = today.toISOString().split("T")[0];
        }
      }

      onAddTask({
        text: newTaskText,
        important: isImportant,
        date: taskDate,
        time: formattedTime,
      });
      setnewTaskText("");
      setNewTaskDate(null);
      setNewTaskTime(null);
      setNewTaskImportant(false);
    }
  };

  const handleSelect = (taskId) => {
    onSelectTask(taskId);
  };

  const handleGlobalKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };
  document.addEventListener("keydown", handleGlobalKeyDown);

  return (
    <div className="content-container">
      {/* TITOLO */}
      <div className="content-header">
        <span
          className="content-icon"
          style={{ color: activeContent.color || "#667eea" }}
        >
          {activeContent.icon && typeof activeContent.icon === "function" ? (
            <activeContent.icon
              size={18}
              color={activeContent.color || "#667eea"}
              className="content-icon"
            />
          ) : (
            activeContent.icon
          )}
        </span>

        <h1 className="content-title" style={{ color: activeContent.color }}>
          {activeContent.name}
        </h1>
      </div>
      {tasks.length === 0 && <p className="no-tasks">No tasks in this list</p>}

      {/* LISTA TASK */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`
              ${task.completed ? "completed" : ""} 
              ${task.important ? "important" : ""}
              ${task.id === activeTask ? "selected" : ""}
            `}
          >
            {/* CONTROL */}
            <div className="task-controls">
              <button
                onClick={() => onToggleComplete(task.id)}
                className="toggle-complete"
                aria-label={
                  task.completed ? "Mark as not completed" : "Mark as completed"
                }
              >
                {task.completed ? <FiCheck /> : <FiCircle />}
              </button>
            </div>
            {/* CONTENT */}
            <div
              className="task-text-container"
              onClick={() => handleSelect(task.id)}
            >
              <span className="task-text">{task.text}</span>
              <span
                className="task-date"
                style={{
                  color: isPastDate(task.date) ? "rgb(255,56,55)" : "#888",
                }}
              >
                {formatTaskDateTime(task.date, task.time)}
              </span>
            </div>
            {/* OTHER */}
            <button
              onClick={() => onToggleImportant(task.id)}
              className={task.important ? "toggle-important" : "toggle-normal"}
              aria-label={
                task.important ? "Mark as not important" : "Mark as important"
              }
            >
              <FiStar fill={task.important ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => onRemoveTask(task.id)}
              className="delete-task"
              aria-label="Delete task"
            >
              <FiTrash2 size={14} />
            </button>
          </li>
        ))}
      </ul>

      {/* INPUT */}
      <div className="input-area">
        <div className="input-data">
          <button
            onClick={() => {
              if (newTaskDate && isToday(newTaskDate)) {
                setNewTaskDate(null);
              } else {
                const today = new Date();
                setNewTaskDate(today);
              }
            }}
            className={`button-data ${
              newTaskDate && isToday(newTaskDate) ? "active" : ""
            }`}
          >
            Today
          </button>
          <button
            onClick={() => {
              if (newTaskDate && isTomorrow(newTaskDate)) {
                setNewTaskDate(null);
              } else {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setNewTaskDate(tomorrow);
              }
            }}
            className={`button-data ${
              newTaskDate && isTomorrow(newTaskDate) ? "active" : ""
            }`}
          >
            Tomorrow
          </button>
          <button
            onClick={() => {
              if (newTaskDate) {
                setNewTaskDate(null);
              } else {
                setShowDatePicker(!showDatePicker);
              }
            }}
            className={`button-data ${
              newTaskDate && !isToday(newTaskDate) && !isTomorrow(newTaskDate)
                ? "active"
                : ""
            }`}
          >
            Date
          </button>
          {showDatePicker && (
            <>
              <div
                className="date-picker-overlay"
                onClick={() => setShowDatePicker(false)}
              />
              <div className="date-picker-container">
                <DatePicker
                  selected={newTaskDate || new Date()}
                  onChange={(date) => {
                    setNewTaskDate(date);
                    setShowDatePicker(false);
                  }}
                  dateFormat="dd/MM/yyyy"
                  inline
                />
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (newTaskTime) {
                setNewTaskTime(null);
              } else {
                setShowTimePicker(!showTimePicker);
              }
            }}
            className={`button-data ${newTaskTime ? "active" : ""}`}
          >
            Time
          </button>
          {showTimePicker && (
            <>
              <div
                className="time-picker-overlay"
                onClick={() => setShowTimePicker(false)}
              />
              <div className="time-picker-container">
                <DatePicker
                  selected={newTaskTime || new Date()}
                  onChange={(date) => {
                    setNewTaskTime(date);
                    setShowTimePicker(false);
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                  inline
                />
              </div>
            </>
          )}
          <button
            onClick={() => setNewTaskImportant(!newTaskImportant)}
            className={`button-important ${
              newTaskImportant ? "toggle-important" : "toggle-normal"
            }`}
          >
            <FiStar fill={newTaskImportant ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="input-text">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setnewTaskText(e.target.value)}
            placeholder={`Add a task to ${
              activeContent?.name || "this list"
            }...`}
          />
        </div>
      </div>
    </div>
  );
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

function formatTaskDateTime(dateStr, timeStr) {
  if (!dateStr) return timeStr || "";

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

  const timePart = timeStr ? `, ${timeStr}` : "";

  return datePart + timePart;
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}
