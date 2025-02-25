import { createBrowserRouter } from "react-router-dom";
// import AuthRoutes from "./auth";
import HomeRoutes from "./home";
import PostRoutes from "./post";
import NotFound from "../pages/errors/NotFound";
// import AdminRoutes from "./admin";
// import AuthorRoutes from "./author";

const AppRoutes = createBrowserRouter([
  // ...AuthRoutes,
  ...HomeRoutes,
  ...PostRoutes,
  // ...AdminRoutes,
  // ...AuthorRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRoutes;
