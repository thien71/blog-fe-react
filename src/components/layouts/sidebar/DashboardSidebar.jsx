import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <aside className="w-48 bg-white border-r h-screen p-2 fixed top-14 left-0 font-summary">
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded-md text-title font-summary hover:text-primary ${
              location.pathname === item.path
                ? "bg-primary text-white hover:text-white hover:cursor-default"
                : ""
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
