import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "../components";
import UserAPI from "../apis/endpoints/users";
import { useAuth } from "../contexts/AuthContext";

const adminMenu = [
  { path: "/admin/dashboard", label: "Trang chủ" },
  {
    // path: "/admin/posts",
    label: "Quản lí bài viết",
    subItems: [
      { path: "/admin/posts", label: "Đang công khai" },
      { path: "/admin/posts/draft", label: "Bản nháp" },
      { path: "/admin/posts/approve", label: "Duyệt bài" },
      { path: "/admin/posts/create", label: "Viết bài" },
    ],
  },
  { path: "/admin/users", label: "Quản lí người dùng" },
  { path: "/admin/categories", label: "Quản lí danh mục" },
  { path: "/admin/tags", label: "Quản lí các tag" },
];

const authorMenu = [
  { path: "/author/dashboard", label: "Trang chủ" },
  {
    // path: "/author/posts",
    label: "Quản lí bài viết",
    subItems: [
      { path: "/author/posts", label: "Đang công khai" },
      { path: "/author/posts/draft", label: "Các bản nháp" },
      { path: "/author/posts/pending", label: "Chờ duyệt" },
      { path: "/author/posts/reject", label: "Bị từ chối" },
      { path: "/author/posts/create", label: "Viết bài" },
    ],
  },
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
