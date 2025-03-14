import { ProtectedRoute } from "../../components";
import DashboardLayout from "../../layouts/DashboardLayout";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import UserManagement from "../../pages/admin/UserManagement";
import TagManagement from "../../pages/admin/TagManagement";
import CategoryManagement from "../../pages/admin/CategoryManagement";
import PostManagement from "../../pages/admin/posts/PostManagement";
import CreatePost from "../../pages/admin/posts/CreatePost";
import PostApprove from "../../pages/admin/posts/PostApprove";
import PostDraft from "../../pages/admin/posts/PostDraft";

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
          { path: "posts/create", element: <CreatePost /> },
          { path: "posts/edit/:id", element: <CreatePost /> },
          { path: "posts/approve", element: <PostApprove /> },
          { path: "posts/draft", element: <PostDraft /> },
        ],
      },
    ],
  },
];

export default AdminRoutes;
