import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 fixed top-14 left-0">
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-2 rounded-md text-title font-summary${
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
