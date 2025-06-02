import '../App.css';
import './TopBar.css';

function TopBar({onToggleSidebar}) {
  return (
    <header className="topbar">
      <button className='menu-toggle' onClick={onToggleSidebar}>
        ☰
      </button>
      <div className="topbar-title">Todo List</div>
      <nav className="topbar-nav">
        {/* nav items */}
      </nav>
    </header>
  );
}

export default TopBar;
