import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "../components";
import UserAPI from "../apis/endpoints/users";
import { useAuth } from "../contexts/AuthContext";

const adminMenu = [
  { path: "/admin/dashboard", label: "Trang chủ" },
  { path: "/admin/posts", label: "Quản lí bài viết" },
  { path: "/admin/users", label: "Quản lí người dùng" },
  { path: "/admin/categories", label: "Quản lí danh mục" },
  { path: "/admin/tags", label: "Quản lí các tag" },
];

const authorMenu = [
  { path: "/author/dashboard", label: "Trang chủ" },
  { path: "/author/posts", label: "Quản lí bài viết" },
  { path: "/author/categories", label: "Quản lí danh mục" },
  { path: "/author/tags", label: "Quản lí các tag" },
];

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader user={user} />
      <div className="flex-1 flex pt-14">
        <DashboardSidebar
          menuItems={user.role === "admin" ? adminMenu : authorMenu}
        />
        <main className="flex-1 p-3 overflow-auto bg-gray-100 ml-48">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
