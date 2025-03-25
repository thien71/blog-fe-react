import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const DashboardSidebar = ({ menuItems }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (item) => {
    if (item.subItems) {
      setOpenMenus((prev) => ({ ...prev, [item.path]: !prev[item.path] }));
    }
  };

  return (
    <aside className="w-48 bg-white border-r h-screen p-3 fixed top-14 left-0 font-summary">
      <nav>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <>
                <div
                  className={`p-2 rounded-md cursor-pointer flex justify-between items-center hover:text-primary ${
                    location.pathname === item.path
                      ? "bg-primary text-white"
                      : "text-title"
                  }`}
                  onClick={() => handleToggle(item)}
                >
                  <span>{item.label}</span>
                  <span>
                    {openMenus[item.path] ? (
                      <MdArrowForwardIos />
                    ) : (
                      <MdArrowForwardIos className="rotate-90" />
                    )}
                  </span>
                </div>
                {openMenus[item.path] && (
                  <div className="ml-4 border-l pl-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-2 py-1 rounded-md hover:text-primary ${
                          location.pathname === subItem.path
                            ? "bg-primary text-white hover:text-white"
                            : "text-title"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`block p-2 rounded-md text-title font-summary hover:text-primary ${
                  location.pathname === item.path
                    ? "bg-primary text-white hover:text-white hover:cursor-default"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
