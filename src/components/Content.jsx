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
        <span className="content-icon">{activeContent.icon}</span>
        <h1 className="content-title">{activeContent.name}</h1>
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
              <button
                onClick={() => onToggleImportant(task.id)}
                className="toggle-important"
                aria-label={task.important ? 'Mark as not important' : 'Mark as important'}
              >
                <FiStar fill={task.important ? 'currentColor' : 'none'} />
              </button>
            </div>
            <span className="task-text">{task.text}</span>
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

