import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../apis/endpoints/auth";

const DashboardHeader = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error.response?.data || error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="flex justify-between items-center py-3 px-4 border-b bg-white fixed top-0 w-full z-10">
      <div className="text-title font-bold">LOGO</div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-summary">{user.name}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg">
            <div className="p-4 text-center">
              <img
                src={user.avatar || "https://i.pravatar.cc/150"}
                alt="avatar"
                className="w-12 h-12 mx-auto rounded-full"
              />
              <p className="font-summary">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <div className="border-t">
              <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                Chỉnh sửa profile
              </button>
              <button
                className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
