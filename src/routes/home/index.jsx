import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/home/HomePage";

// import { ErrorBoundary } from "react-error-boundary";

const HomeRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <HomePage /> }],
  },
];

export default HomeRoutes;
