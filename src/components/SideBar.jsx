import '../App.css';

function SideBar({isOpen}) {
  return (
    <aside className={`sidebar ${isOpen ? 'open': ''}`}>
      <h2 className="text-2xl font-semibold mb-4">Navigazione</h2>
        <ul>
          <li>📁 Elenco A</li>
          <li>📁 Elenco B</li>
          <li>📁 Elenco C</li>
          <li>📁 Elenco D</li>
        </ul>
    </aside>
  );
}

export default SideBar;
