import '../App.css';
import './SideBar.css';
import {
  FiUser,
  FiSun,
  FiAlertCircle,
  FiCalendar,
  FiBriefcase,
  FiHome,
  FiShoppingCart
} from 'react-icons/fi';

function SideBar({isOpen}) {
  return (
    <aside className={`sidebar ${isOpen ? 'open': ''}`}>
      <ul>
        <li><FiUser className="icon" /> Account</li>
        <li><FiSun className="icon" /> My Day</li>
        <li><FiAlertCircle className="icon" /> Important</li>
        <li><FiCalendar className="icon" /> Planned</li>
        <li><FiBriefcase className="icon" /> Work</li>
        <li><FiHome className="icon" /> Home</li>
        <li><FiShoppingCart className="icon" /> Groceries</li>
      </ul>
    </aside>
  );
}

export default SideBar;
