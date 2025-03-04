import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "../components";
import UserAPI from "../apis/endpoints/users";

const adminMenu = [
  { path: "/admin/posts", label: "Quản lí bài viết" },
  { path: "/admin/users", label: "Quản lí người dùng" },
  { path: "/admin/categories", label: "Quản lí danh mục" },
  { path: "/admin/tags", label: "Quản lí các tag" },
];

const authorMenu = [
  { path: "/author/posts", label: "Quản lí bài viết" },
  { path: "/author/tags", label: "Quản lí các tag" },
];

const DashboardLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await UserAPI.getCurrentUser();

        if (response.data.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết nổi bật:", error);
      }
    })();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader user={user} />
      <div className="flex-1 flex pt-14">
        <DashboardSidebar
          menuItems={user.role === "admin" ? adminMenu : authorMenu}
        />
        <main className="flex-1 p-3 overflow-auto bg-gray-100 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
