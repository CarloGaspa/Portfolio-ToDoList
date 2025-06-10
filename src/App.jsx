import "./App.css";
import { useState } from "react";
import TopBar from "./components/TopBar.jsx";
import SideBar from "./components/SideBar.jsx";
import Content from "./components/Content.jsx";
import ModalList from "./components/ModalList.jsx";
import DetailsBar from "./components/DetailsBar.jsx";

import {
  FiInbox,
  FiSun,
  FiAlertCircle,
  FiCalendar,
  FiBriefcase,
  FiHome,
  FiShoppingCart,
  FiTrash,
} from "react-icons/fi";

const LIST_IDS = {
  INBOX: "inbox",
  MY_DAY: "myday",
  IMPORTANT: "important",
  PLANNED: "planned",
  COMPLETED: "completed",
};

const DEFAULT_COLORS = [
  "#667eea", // Inbox (blu)
  "#48bb78", // My Day (verde)
  "#ed8936", // Important (arancione)
  "#9f7aea", // Planned (viola)
  "#A9A9A9", // Completed (grigio)
  "#4299e1", // Work (azzurro)
  "#e53e3e", // Home (rosso)
  "#38b2ac", // Groceries (turchese)
];

const sideBarInitialState = [
  {
    id: LIST_IDS.INBOX,
    name: "Inbox",
    icon: <FiInbox />,
    deletable: false,
    color: DEFAULT_COLORS[0],
  },
  {
    id: LIST_IDS.MY_DAY,
    name: "My Day",
    icon: <FiSun />,
    deletable: false,
    color: DEFAULT_COLORS[1],
  },
  {
    id: LIST_IDS.IMPORTANT,
    name: "Important",
    icon: <FiAlertCircle />,
    deletable: false,
    color: DEFAULT_COLORS[2],
  },
  {
    id: LIST_IDS.PLANNED,
    name: "Planned",
    icon: <FiCalendar />,
    deletable: false,
    color: DEFAULT_COLORS[3],
  },
  {
    id: LIST_IDS.COMPLETED,
    name: "Completed",
    icon: <FiTrash />,
    deletable: false,
    color: DEFAULT_COLORS[4],
  },
  {
    id: "work",
    name: "Work",
    icon: <FiBriefcase />,
    deletable: true,
    color: DEFAULT_COLORS[5],
  },
  {
    id: "home",
    name: "Home",
    icon: <FiHome />,
    deletable: true,
    color: DEFAULT_COLORS[6],
  },
  {
    id: "groceries",
    name: "Groceries",
    icon: <FiShoppingCart />,
    deletable: true,
    color: DEFAULT_COLORS[7],
  },
];

const tasksInitialState = [
  {
    id: "task-1",
    text: "Complete project",
    completed: false,
    list: "work",
    important: true,
    date: "2027-06-03",
    time: "15:00",
  },
  {
    id: "task-2",
    text: "Meeting with team",
    completed: false,
    list: "work",
    important: false,
    date: "2025-06-03",
    time: "",
  },
  {
    id: "task-3",
    text: "Clean the house",
    completed: false,
    list: "home",
    important: false,
    date: "",
    time: "",
  },
  {
    id: "task-4",
    text: "Buy milk",
    completed: false,
    list: "groceries",
    important: true,
    date: "2025-06-20",
    time: "09:00",
  },
  {
    id: "task-5",
    text: "Pay bills",
    completed: false,
    list: "home",
    important: false,
    date: "",
    time: "",
  },
  {
    id: "task-6",
    text: "Prepare presentation",
    completed: false,
    list: "work",
    important: true,
    date: "2025-06-04",
    time: "",
  },
  {
    id: "task-7",
    text: "Go to gym",
    completed: true,
    list: "personal",
    important: false,
    date: "2025-06-20",
    time: "18:00",
  },
  {
    id: "task-8",
    text: "Read new book",
    completed: false,
    list: "personal",
    important: false,
    date: "2025-06-20",
    time: "",
  },
  {
    id: "task-9",
    text: "Call mom",
    completed: false,
    list: "personal",
    important: true,
    date: "",
    time: "",
  },
  {
    id: "task-10",
    text: "Organize workspace",
    completed: true,
    list: "work",
    important: false,
    date: "2025-06-20",
    time: "10:00",
  },
  {
    id: "task-11",
    text: "Buy Christmas gifts",
    completed: false,
    list: "shopping",
    important: true,
    date: "2025-06-05",
    time: "16:30",
  },
  {
    id: "task-12",
    text: "Plan vacation",
    completed: false,
    list: "personal",
    important: false,
    date: "",
    time: "",
  },
  {
    id: "task-13",
    text: "Fix leaking faucet",
    completed: false,
    list: "home",
    important: true,
    date: "2025-06-20",
    time: "13:45",
  },
  {
    id: "task-14",
    text: "Review documents",
    completed: true,
    list: "work",
    important: false,
    date: "2024-11-15",
    time: "",
  },
  {
    id: "task-15",
    text: "Meditate for 10 mins",
    completed: false,
    list: "personal",
    important: false,
    date: "",
    time: "",
  },
  {
    id: "task-16",
    text: "Update resume",
    completed: false,
    list: "work",
    important: true,
    date: "2023-02-20",
    time: "09:00",
  },
  {
    id: "task-17",
    text: "Water plants",
    completed: true,
    list: "home",
    important: false,
    date: "2025-06-20",
    time: "08:00",
  },
  {
    id: "task-18",
    text: "Learn new recipe",
    completed: false,
    list: "personal",
    important: false,
    date: "2025-06-20",
    time: "",
  },
  {
    id: "task-19",
    text: "Backup computer",
    completed: false,
    list: "work",
    important: true,
    date: "2026-03-15",
    time: "17:00",
  },
  {
    id: "task-20",
    text: "Renew subscription",
    completed: false,
    list: "personal",
    important: false,
    date: "2023-04-10",
    time: "",
  },
];

export default function App() {
  /* States lists*/
  const [sideBarItems, setSideBarItems] = useState(sideBarInitialState);
  const [activeContent, setActiveContent] = useState(LIST_IDS.INBOX);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalListOpen, setIsModalListOpen] = useState(false);

  /* States tasks*/
  const [tasks, setTasks] = useState(tasksInitialState);
  const [activeTask, setActivetask] = useState("");
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);

  /* Functions */
  const toggleSideBar = () => setSidebarOpen((prev) => !prev);

  const handleAddItem = (newItem) => {
    const color =
      newItem.color ||
      DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
    setSideBarItems([...sideBarItems, { ...newItem, color }]);
  };

  const handleRemoveItem = (id) => {
    setSideBarItems(sideBarItems.filter((item) => item.id !== id));
    //rimuovo anche i task associati alla lista
    setTasks(tasks.filter((task) => task.list !== id));

    //se stiamo eliminando l'elemento attualmente attivo, torniamo a 'Inbox'
    if (activeContent === id) {
      setActiveContent("inbox");
    }
  };

  //Filtra i task in base alla pagina selezionata
  const getFilteredTasks = () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    const filterMap = {
      [LIST_IDS.INBOX]: (task) => !task.completed,

      [LIST_IDS.MY_DAY]: (task) => {
        if (task.completed) return false;
        if (!task.date) return false;

        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate <= todayStart;
      },

      [LIST_IDS.IMPORTANT]: (task) => !task.completed && task.important,

      [LIST_IDS.PLANNED]: (task) => {
        if (task.completed) return false;
        if (!task.date) return false;

        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate >= tomorrowStart;
      },

      [LIST_IDS.COMPLETED]: (task) => task.completed,

      default: (task) => !task.completed && task.list === activeContent,
    };

    const filterFn = filterMap[activeContent] || filterMap.default;
    return tasks.filter(filterFn);
  };

  const handleAddTask = (newTask) => {
    const activeItem = sideBarItems.find((item) => item.id === activeContent);

    setTasks([
      ...tasks,
      {
        id: `task-${Date.now()}`,
        text: newTask.text,
        completed: false,
        list:
          activeItem?.deletable === false && activeContent !== LIST_IDS.INBOX
            ? LIST_IDS.INBOX
            : activeContent,
        important: newTask.important || false,
        date: newTask.date || null,
        time: newTask.time || null,
      },
    ]);
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleImportant = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task
      )
    );
  };

  const handleSelectTask = (taskId) => {
    setActivetask(taskId);
    setTaskDetailsOpen(true);
  };

  /* Return */
  return (
    <>
      <TopBar onToggleSidebar={toggleSideBar} />
      <div className={`main-area ${sidebarOpen ? "sidebar-open" : ""}`}>
        <SideBar
          isOpen={sidebarOpen}
          onOpenClose={() => setSidebarOpen(!sidebarOpen)}
          items={sideBarItems}
          onSelectItem={setActiveContent}
          onAddItem={() => setIsModalListOpen(true)} // apri pop-up
          onRemoveItem={handleRemoveItem}
          activeContent={activeContent}
        />
        <div className={`content-area ${sidebarOpen ? "" : "sidebar-closed"}`}>
          <Content
            activeContent={sideBarItems.find(
              (item) => item.id === activeContent
            )}
            tasks={getFilteredTasks()}
            onSelectTask={handleSelectTask}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            currentList={activeContent}
            activeTask={activeTask}
          />
        </div>
        <DetailsBar
          isOpen={taskDetailsOpen}
          onClose={() => setTaskDetailsOpen(false)}
          item={tasks.find((task) => task.id === activeTask)}
        />
      </div>
      <ModalList
        open={isModalListOpen}
        onOpenChange={setIsModalListOpen}
        onConfirm={(newItem) => {
          handleAddItem(newItem);
          setActiveContent(newItem.id);
          setIsModalListOpen(false);
        }}
      />
    </>
  );
}
