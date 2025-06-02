import '../App.css';
import './Content.css';
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

export default function Content({activeContent}) {
  return (
    <div className="content-container">
      <div className="content-header">
        <span className="content-icon">{activeContent.icon}</span>
        <h1 className="content-title">{activeContent.name}</h1>
      </div>
      {/* Qui puoi aggiungere altro contenuto specifico per ogni voce */}
    </div>
  )
}

