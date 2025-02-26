import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r h-screen p-4">
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded-md ${
              location.pathname === item.path ? "bg-gray-200" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
