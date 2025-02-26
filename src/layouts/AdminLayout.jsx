import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "../components";
import UserAPI from "../apis/endpoints/users";

const adminMenu = [
  { path: "/admin/posts", label: "Quản lí bài viết" },
  { path: "/admin/users", label: "Quản lí tài khoản" },
  { path: "/admin/categories", label: "Quản lí danh mục" },
  { path: "/admin/tags", label: "Quản lí tag" },
];

const AdminLayout = () => {
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
    <div className="flex h-screen">
      <DashboardSidebar menuItems={adminMenu} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader user={user} />
        <main className="flex-1 p-4 overflow-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
