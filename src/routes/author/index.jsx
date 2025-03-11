import { ProtectedRoute } from "../../components";
import DashboardLayout from "../../layouts/DashboardLayout";
import CreatePost from "../../pages/admin/posts/CreatePost";
import PostDraft from "../../pages/admin/posts/PostDraft";
import PostManagement from "../../pages/admin/posts/PostManagement";
import TagManagement from "../../pages/admin/TagManagement";
import AuthorDashboard from "../../pages/author/AuthorDashboard";
// import CreatePost from "pages/author/CreatePost";

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
          { path: "posts/edit/:id", element: <CreatePost /> },
          // { path: "posts/approve", element: <PostApprove /> },
          { path: "posts/draft", element: <PostDraft /> },
          { path: "tags", element: <TagManagement /> },
        ],
      },
    ],
  },
];

export default AuthorRoutes;
