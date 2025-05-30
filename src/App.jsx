import './App.css'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'
import MainContent from './components/MainContent.jsx'

function App() {
  return (
    <div className='app-wrapper'>
      <TopBar />
      <div className="app-container">
        <SideBar />
        <MainContent />
      </div>
    </div>
  )
}

export default App
