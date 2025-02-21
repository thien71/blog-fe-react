import AdminLayout from "layouts/AdminLayout";
import AdminDashboard from "pages/admin/Dashboard";
import UserManagement from "pages/admin/UserManagement";
import PostApproval from "pages/admin/PostApproval";

const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "posts", element: <PostApproval /> },
    ],
  },
];

export default AdminRoutes;
