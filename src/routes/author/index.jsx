import AuthorLayout from "layouts/AuthorLayout";
import AuthorDashboard from "pages/author/Dashboard";
import CreatePost from "pages/author/CreatePost";

const AuthorRoutes = [
  {
    path: "/author",
    element: <AuthorLayout />,
    children: [
      { path: "dashboard", element: <AuthorDashboard /> },
      { path: "posts/create", element: <CreatePost /> },
    ],
  },
];

export default AuthorRoutes;
