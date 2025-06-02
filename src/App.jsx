import './App.css'
import { useState } from 'react'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'
import Content from './components/Content.jsx'
import {
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
    { id: 'account'     , name: 'Account'   , icon: <FiUser />          , deletable: false },
    { id: 'myday'       , name: 'My Day'    , icon: <FiSun />           , deletable: false },
    { id: 'important'   , name: 'Important' , icon: <FiAlertCircle />   , deletable: false },
    { id: 'planned'     , name: 'Planned'   , icon: <FiCalendar />      , deletable: false },
    { id: 'work'        , name: 'Work'      , icon: <FiBriefcase />     , deletable: true },
    { id: 'home'        , name: 'Home'      , icon: <FiHome />          , deletable: true },
    { id: 'groceries'   , name: 'Groceries' , icon: <FiShoppingCart />  , deletable: true },
  ]);
  const [activeContent, setActiveContent] = useState('account');

  /* Functions */
  const toggleSideBar = () => setSidebarOpen(prev => !prev);

  const handleAddItem = (newItem) => {
    setSideBarItems([...sideBarItems, newItem]);
  }

  const handleRemoveItem = (id) => {
    setSideBarItems(sideBarItems.filter(item => item.id !== id));
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
          />
        </div>
      </div>
    </>
  )
}
