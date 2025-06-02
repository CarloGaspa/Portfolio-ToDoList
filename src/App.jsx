import './App.css'
import { useState } from 'react'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'
import Content from './components/Content.jsx'
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

const LIST_IDS = {
  INBOX: 'inbox',
  MY_DAY: 'myday',
  IMPORTANT: 'important',
  PLANNED: 'planned',
}

const DEFAULT_COLORS = [
  '#667eea', // Inbox (blu)
  '#48bb78', // My Day (verde)
  '#ed8936', // Important (arancione)
  '#9f7aea', // Planned (viola)
  '#4299e1', // Work (azzurro)
  '#e53e3e', // Home (rosso)
  '#38b2ac', // Groceries (turchese)
];

export default function App() {
  /* States */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideBarItems, setSideBarItems] = useState([
    { id: LIST_IDS.INBOX      , name: 'Inbox'     , icon: <FiInbox />         , deletable: false    , color: DEFAULT_COLORS[0]},
    { id: LIST_IDS.MY_DAY     , name: 'My Day'    , icon: <FiSun />           , deletable: false    , color: DEFAULT_COLORS[1]},
    { id: LIST_IDS.IMPORTANT  , name: 'Important' , icon: <FiAlertCircle />   , deletable: false    , color: DEFAULT_COLORS[2]},
    { id: LIST_IDS.PLANNED    , name: 'Planned'   , icon: <FiCalendar />      , deletable: false    , color: DEFAULT_COLORS[3]},
    { id: 'work'              , name: 'Work'      , icon: <FiBriefcase />     , deletable: true     , color: DEFAULT_COLORS[4]},
    { id: 'home'              , name: 'Home'      , icon: <FiHome />          , deletable: true     , color: DEFAULT_COLORS[5]},
    { id: 'groceries'         , name: 'Groceries' , icon: <FiShoppingCart />  , deletable: true     , color: DEFAULT_COLORS[6]},
  ]);
  const [activeContent, setActiveContent] = useState('inbox');
  const [tasks, setTasks] = useState([
    { id: 'task-1', text: 'Complete project', completed: false, list: 'work', important: true, dueDate: '2023-12-15' },
    { id: 'task-2', text: 'Meeting with team', completed: true, list: 'work', important: false, dueDate: '2026-12-10' },
    { id: 'task-3', text: 'Clean the house', completed: false, list: 'home', important: false, dueDate: null },
    { id: 'task-4', text: 'Buy milk', completed: false, list: 'groceries', important: true, dueDate: null },
    { id: 'task-5', text: 'Pay bills', completed: false, list: 'home', important: false, dueDate: '2025-02-20' },
    { id: 'task-6', text: 'Prepare presentation', completed: false, list: 'work', important: true, dueDate: '2026-11-30' },
    { id: 'task-7', text: 'Go to gym', completed: true, list: 'personal', important: false, dueDate: '2026-12-05' },
    { id: 'task-8', text: 'Read new book', completed: false, list: 'personal', important: false, dueDate: '2026-12-25' },
    { id: 'task-9', text: 'Call mom', completed: false, list: 'personal', important: true, dueDate: null },
    { id: 'task-10', text: 'Organize workspace', completed: true, list: 'work', important: false, dueDate: '2023-11-28' },
    { id: 'task-11', text: 'Buy Christmas gifts', completed: false, list: 'shopping', important: true, dueDate: '2026-12-15' },
    { id: 'task-12', text: 'Plan vacation', completed: false, list: 'personal', important: false, dueDate: '2024-06-01' },
    { id: 'task-13', text: 'Fix leaking faucet', completed: false, list: 'home', important: true, dueDate: '2024-01-10' },
    { id: 'task-14', text: 'Review documents', completed: true, list: 'work', important: false, dueDate: '2024-11-15' },
    { id: 'task-15', text: 'Meditate for 10 mins', completed: false, list: 'personal', important: false, dueDate: null },
    { id: 'task-16', text: 'Update resume', completed: false, list: 'work', important: true, dueDate: '2026-02-20' },
    { id: 'task-17', text: 'Water plants', completed: true, list: 'home', important: false, dueDate: '2026-12-01' },
    { id: 'task-18', text: 'Learn new recipe', completed: false, list: 'personal', important: false, dueDate: null },
    { id: 'task-19', text: 'Backup computer', completed: false, list: 'work', important: true, dueDate: '2026-03-15' },
    { id: 'task-20', text: 'Renew subscription', completed: false, list: 'personal', important: false, dueDate: '2026-04-10' }
  ]);

  /* Functions */
  const toggleSideBar = () => setSidebarOpen(prev => !prev);

  const handleAddItem = (newItem) => {
    const color = newItem.color || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
    setSideBarItems([...sideBarItems, {...newItem, color}]);
  }

  const handleRemoveItem = (id) => {
    setSideBarItems(sideBarItems.filter(item => item.id !== id));
    //rimuovo anche i task associati alla lista
    setTasks(tasks.filter(task => task.list !== id));

    //se stiamo eliminando l'elemento attualmente attivo, torniamo a 'Inbox'
    if (activeContent === id) {
      setActiveContent('inbox');
    }
  }

  //Filtra i task in base alla pagina selezionata
  const getFilteredTasks = () => {
    const today = new Date();
    today.setHours(0,0,0,0);  // Imposta a inizio giornata per il confronto

    switch(activeContent){
      case LIST_IDS.INBOX:
        return tasks.filter(task => {
          if (task.completed) return false;
          return task;
        });
      case LIST_IDS.MY_DAY:
        return tasks.filter(task => {
          if (task.completed) return false;
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0)
          return taskDate <= today;
        });
      case LIST_IDS.IMPORTANT:
        return tasks.filter(task => {
          if(task.completed) return false;
          return task.important;
        })
      case LIST_IDS.PLANNED:
        return tasks.filter(task => {
          if(task.completed) return false;
          if (!task.dueDate) return false;  
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate >= today;
        });
      default:
        return tasks.filter(task => {
          if(task.completed) return false;
          return task.list === activeContent;
        });
    }
  }

const handleAddTask = (newTask) => {
  const activeItem = sideBarItems.find(item => item.id === activeContent);
  
  setTasks([...tasks, {
    id: `task-${Date.now()}`,
    text: newTask.text,
    completed: false,
    list: activeItem?.deletable === false && activeContent !== LIST_IDS.INBOX
      ? LIST_IDS.INBOX
      : activeContent,
    important: false,
    dueDate: null
  }]);
}

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task
    ));
  }

  const handleToggleImportant = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? {...task, important: !task.important} : task
    ));
  }

  /* Return */
  return (
    <>
      <TopBar onToggleSidebar={toggleSideBar} />
      <div className="main-area">
        <SideBar 
          isOpen={sidebarOpen}
          items={sideBarItems}
          onSelectItem={setActiveContent}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          activeContent={activeContent}
        />
        <div className="content-area">
          <Content
            activeContent={sideBarItems.find(item => item.id === activeContent)}
            tasks={getFilteredTasks()}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            currentList={activeContent}
          />
        </div>
      </div>
    </>
  )
}
