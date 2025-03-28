import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../../apis/endpoints/auth";
import { Avatar, Logo } from "../../common";
import EditUserModal from "../../../components/features/users/EditUserModal";
import useModal from "../../../hooks/useModal";

const DashboardHeader = ({ user: initialUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error.response?.data || error);
    }
  };

  const handleUpdated = (updatedUser) => {
    setUser(updatedUser);
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
      <div className="text-title font-bold">
        <Link
          to={user.role === "admin" ? "/admin/dashboard" : "/author/dashboard"}
          className="font-title hover:text-primary"
        >
          <Logo />
        </Link>
      </div>

      <div className="relative text-title" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-title text-title">{user.name}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg">
            <div className="p-4 text-center">
              <Avatar
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 mx-auto rounded-full"
              />
              <p className="font-title mt-2">{user.name}</p>
              <p className="text-xs text-primary font-title mt-1">
                {user.role}
              </p>
            </div>
            <div className="border-t">
              <button
                className="w-full px-4 py-2 hover:bg-gray-100 text-left block hover:text-title"
                onClick={() => openEditModal(user)}
              >
                Thông tin cá nhân
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

      {isEditOpen && (
        <EditUserModal
          isOpen={isEditOpen}
          user={user}
          onClose={closeEditModal}
          onUpdated={handleUpdated}
        />
      )}
    </header>
  );
};

export default DashboardHeader;
