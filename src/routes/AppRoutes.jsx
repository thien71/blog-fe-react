import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthRoutes from "./auth";
import HomeRoutes from "./home";
import PostRoutes from "./post";
import AdminRoutes from "./admin";
import AuthorRoutes from "./author";
import NotFound from "../pages/errors/NotFound";

const AppRoutes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      ...AuthRoutes,
      ...HomeRoutes,
      ...PostRoutes,
      ...AdminRoutes,
      ...AuthorRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default AppRoutes;
