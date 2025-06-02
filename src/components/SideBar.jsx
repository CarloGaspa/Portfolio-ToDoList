import '../App.css';
import './SideBar.css';
import {
  FiInbox,
  FiUser,
  FiSun,
  FiAlertCircle,
  FiCalendar,
  FiBriefcase,
  FiHome,
  FiShoppingCart,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi';
import { useState } from 'react';

export default function SideBar({
  items = [],
  isOpen,
  onSelectItem,
  onAddItem,
  onRemoveItem,
  activeContent
}) {
  const handleSelect = (id) => {
    if (onSelectItem) onSelectItem(id);
  }

  const handleAdd = () => {
    const newId = `item-${Date.now()}`;
    const newItem = { 
      id: newId, 
      name: `New list`, 
      icon: <FiPlus />,
      deletable: true
    };
    if (onAddItem) onAddItem(newItem);
    handleSelect(newId);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open': ''}`}>
      <ul>
        {items.map((item) => (
            <li
              key={item.id}
              className={activeContent === item.id ? 'selected' : ''}
              onClick={() => handleSelect(item.id)}
            >
              <span className="icon">{item.icon || <FiPlus />}</span>
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
      <button onClick={handleAdd} className='add-btn'>
        <span className="icon">{<FiPlus />}</span>
        <span className="label">Add list</span>
      </button>
    </aside>
  );
}
