import './SideBar.css';

function SideBar() {
  return (
    <aside className="sidebar">
      <h2 className="text-2xl font-semibold mb-4">Navigazione</h2>
      <nav>
        {/* Inserisci qui le voci di menu */}
        <ul>
          <li>📁 Elenco A</li>
          <li>📁 Elenco B</li>
          <li>📁 Elenco C</li>
          <li>📁 Elenco D</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
