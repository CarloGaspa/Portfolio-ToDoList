import "../App.css";
import "./TopBar.css";

export default function TopBar({ onToggleSidebar }) {
  return (
    <header className="topbar">
      <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Open sidebar">
        &#9776;
      </button>
      <div className="topbar-title">Todo List</div>
      <nav className="topbar-nav">{/* nav items */}</nav>
    </header>
  );
}
