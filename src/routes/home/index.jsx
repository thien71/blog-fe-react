import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/home/HomePage";
// import PostDetail from "pages/PostDetail";
// import { ErrorBoundary } from "react-error-boundary";

const HomeRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} />,
    children: [
      { path: "", element: <HomePage /> },
      // { path: "posts/:slug", element: <PostDetail /> },
    ],
  },
];

export default HomeRoutes;
