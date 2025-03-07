import { ProtectedRoute } from "../../components";
import DashboardLayout from "../../layouts/DashboardLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import UserManagement from "../../pages/admin/UserManagement";
import TagManagement from "../../pages/admin/TagManagement";
import CategoryManagement from "../../pages/admin/CategoryManagement";
import PostManagement from "../../pages/admin/PostManagement";
import PostApprove from "../../pages/admin/PostApprove";
import CreatePost from "../../pages/admin/CreatePost";

const AdminRoutes = [
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <UserManagement /> },
          { path: "tags", element: <TagManagement /> },
          { path: "categories", element: <CategoryManagement /> },
          { path: "posts", element: <PostManagement /> },
          { path: "posts/approve", element: <PostApprove /> },
          { path: "posts/create", element: <CreatePost /> },
        ],
      },
    ],
  },
];

export default AdminRoutes;
