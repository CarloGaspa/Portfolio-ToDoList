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

export default function App() {
  /* States */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sideBarItems, setSideBarItems] = useState([
    { id: 'inbox'       , name: 'Inbox'     , icon: <FiInbox />         , deletable: false },
    { id: 'myday'       , name: 'My Day'    , icon: <FiSun />           , deletable: false },
    { id: 'important'   , name: 'Important' , icon: <FiAlertCircle />   , deletable: false },
    { id: 'planned'     , name: 'Planned'   , icon: <FiCalendar />      , deletable: false },
    { id: 'work'        , name: 'Work'      , icon: <FiBriefcase />     , deletable: true },
    { id: 'home'        , name: 'Home'      , icon: <FiHome />          , deletable: true },
    { id: 'groceries'   , name: 'Groceries' , icon: <FiShoppingCart />  , deletable: true },
  ]);
  const [activeContent, setActiveContent] = useState('inbox');
  const [tasks, setTasks] = useState([
    { id: 'task-1', text: 'Complete project', completed: false, list: 'work', important: true, dueDate: '2023-12-15' },
    { id: 'task-2', text: 'Meeting with team', completed: true, list: 'work', important: false, dueDate: '2023-12-10' },
    { id: 'task-3', text: 'Clean the house', completed: false, list: 'home', important: false, dueDate: null },
    { id: 'task-4', text: 'Buy milk', completed: false, list: 'groceries', important: true, dueDate: null },
    { id: 'task-5', text: 'Pay bills', completed: false, list: 'home', important: false, dueDate: '2023-12-20' },
  ]);

  /* Functions */
  const toggleSideBar = () => setSidebarOpen(prev => !prev);

  const handleAddItem = (newItem) => {
    setSideBarItems([...sideBarItems, newItem]);
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
    switch(activeContent){
      case 'inbox':
        return [];
      case 'myday':
        return tasks.filter(task => !task.completed)
      case 'important':
        return tasks.filter(task => task.important)
      case 'planned':
        return tasks.filter(task => task.dueDate);
      default:
        return tasks.filter(task => task.list === activeContent);
    }
  }

  const handleAddTask = (newTask) => {
    setTasks([...tasks, {
      id: `task-${Date.now()}`,
      text: newTask.text,
      completed: false,
      list: activeContent === 'myday' || activeContent === 'important' || activeContent === 'planned' 
        ? 'inbox' 
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
