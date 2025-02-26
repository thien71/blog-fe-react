import { useState } from "react";

const DashboardHeader = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      {/* Logo */}
      <div className="text-title font-bold">LOGO</div>

      {/* Avatar + Role */}
      <div className="relative">
        <button
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-summary">{user.role}</span>
        </button>

        {/* Dropdown */}
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
              <button className="w-full p-2 hover:bg-gray-100 text-left">
                Chỉnh sửa profile
              </button>
              <button className="w-full p-2 hover:bg-gray-100 text-left text-red-500">
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
