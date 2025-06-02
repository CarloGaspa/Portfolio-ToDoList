import './App.css'
import { useState } from 'react'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'
import Content from './components/Content.jsx'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSideBar = () => setSidebarOpen(prev => !prev);

  return (
    <>
      <TopBar onToggleSidebar={toggleSideBar} />
      <div className="container-area">
        <SideBar isOpen={sidebarOpen} />
        <div className="content">
          <Content />
        </div>
      </div>
    </>
  )
}

export default App
