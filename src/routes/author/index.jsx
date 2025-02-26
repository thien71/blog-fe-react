import { ProtectedRoute } from "../../components";
import DashboardLayout from "../../layouts/DashboardLayout";
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
          // { path: "posts/create", element: <CreatePost /> },
        ],
      },
    ],
  },
];

export default AuthorRoutes;
