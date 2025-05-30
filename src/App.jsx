import './App.css'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'
import Content from './components/Content.jsx'

function App() {
  return (
    <>
      <TopBar />
      <div className="container">
        <SideBar />
        <Content />
      </div> 
    </>
  )
}

export default App
