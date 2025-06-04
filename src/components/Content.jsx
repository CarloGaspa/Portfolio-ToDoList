import '../App.css';
import './Content.css';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiCircle, FiStar } from 'react-icons/fi';

export default function Content({
  activeContent,
  tasks = [],
  onAddTask,
  onRemoveTask,
  onToggleComplete,
  onToggleImportant,
  currentList,
}) {
  const [newTasktext, setNewTasktext] = useState('');

  const handleAddTask = () => {
    if (newTasktext.trim()){
      onAddTask({
        text : newTasktext
      });
      setNewTasktext('');
    }
  }

  return (
    <div className="content-container">
      <div className="content-header">
        <span className="content-icon" style={{color: activeContent.color}}>{activeContent.icon}</span>
        <h1 className="content-title" style={{color: activeContent.color}}>{activeContent.name}</h1>
      </div>

      <ul className='task-list'>
        {tasks.map((task) => (
          <li key={task.id} className={`${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`}>
            <div className="task-controls">
              <button 
                onClick={() => onToggleComplete(task.id)}
                className="toggle-complete"
                aria-label={task.completed ? 'Mark as not completed' : 'Mark as completed'}
              >
                {task.completed ? <FiCheck /> : <FiCircle />}
              </button>
            </div>
            <div className="task-text-container">
              <span className="task-text">{task.text}</span>
              <span
                className="task-date"
                style={{ color: isPastDate(task.date) ? 'rgb(255,56,55)' : '#888' }}
              >
                {formatTaskDateTime(task.date, task.time)}
              </span>
            </div>
            <button
              onClick={() => onToggleImportant(task.id)}
              className={task.important ? 'toggle-important' : 'toggle-normal'}
              aria-label={task.important ? 'Mark as not important' : 'Mark as important'}
            >
              <FiStar fill={task.important ? 'currentColor' : 'none'} />
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
      {tasks.length === 0 && currentList !== 'account' && (
        <p className="no-tasks">No tasks in this list</p>
      )}
      <input
        type="text"
        value={newTasktext}
        onChange={(e) => setNewTasktext(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        placeholder={`Add a task to ${activeContent?.name || 'this list'}...`}
      />
    </div>
  )
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
  if (!dateStr) return timeStr || '';
  
  const taskDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  let datePart = '';
  
  const taskDateOnly = new Date(taskDate);
  taskDateOnly.setHours(0, 0, 0, 0);
  
  if (taskDateOnly.getTime() === today.getTime()) {
    datePart = 'Today';
  } else if (taskDateOnly.getTime() === yesterday.getTime()) {
    datePart = 'Yesterday';
  } else if (taskDateOnly.getTime() === tomorrow.getTime()) {
    datePart = 'Tomorrow';
  } else {
    const day = String(taskDate.getDate()).padStart(2, '0');
    const month = String(taskDate.getMonth() + 1).padStart(2, '0');
    const year = String(taskDate.getFullYear()).slice(-2);
    datePart = `${day}/${month}/${year}`;
  }
  
  const timePart = timeStr ? `, ${timeStr}` : '';
  
  return datePart + timePart;
}