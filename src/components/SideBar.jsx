import '../App.css';
import './SideBar.css';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';

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
      icon: <FiEdit2 />,
      deletable: true,
      color: '#667eea' // Aggiungi colore predefinito per nuove liste
    };
    if (onAddItem) onAddItem(newItem);
    handleSelect(newId);
  };

  const updateItemColor = (itemId, currentColor) => {
    const newColor = prompt('Enter a new color (hex code):', currentColor);
    if (newColor && onAddItem) {
      onAddItem({
        id: itemId,
        color: newColor
      });
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open': ''}`}>
      <ul>
        {items.map((item) => (
            <li
              key={item.id}
              className={activeContent === item.id ? 'selected' : ''}
              onClick={() => handleSelect(item.id)}
              style={{ '--accent': item.color || '#667eea' }} // Aggiungi questa linea
            >
              <span className="icon" style={{ color: item.color || '#667eea' }}>
                {item.icon || <FiEdit2 />}
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
      <button onClick={onAddItem} className='add-btn'>
        <span className="icon"><FiPlus /></span>
        <span className="label">Add list</span>
      </button>
    </aside>
  );
}