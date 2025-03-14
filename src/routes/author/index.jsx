import { ProtectedRoute } from "../../components";
import DashboardLayout from "../../layouts/DashboardLayout";
import AuthorDashboard from "../../pages/author/AuthorDashboard";
import TagManagement from "../../pages/admin/TagManagement";
import CategoryManagement from "../../pages/admin/CategoryManagement";
import PostManagement from "../../pages/admin/posts/PostManagement";
import CreatePost from "../../pages/admin/posts/CreatePost";
import PostDraft from "../../pages/admin/posts/PostDraft";
import PostPending from "../../pages/author/PostPending";
import PostRejected from "../../pages/author/PostRejected";

const AuthorRoutes = [
  {
    path: "/author",
    element: <ProtectedRoute allowedRoles={["author"]} />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <AuthorDashboard /> },
          { path: "posts", element: <PostManagement /> },
          { path: "posts/create", element: <CreatePost /> },
          { path: "posts/edit/:id", element: <CreatePost /> },
          { path: "posts/draft", element: <PostDraft /> },
          { path: "posts/reject", element: <PostRejected /> },
          { path: "posts/pending", element: <PostPending /> },
          { path: "tags", element: <TagManagement /> },
          { path: "categories", element: <CategoryManagement /> },
        ],
      },
    ],
  },
];

export default AuthorRoutes;
