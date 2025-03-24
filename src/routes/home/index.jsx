import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/home/HomePage";
import SearchResult from "../../pages/search/SearchResult";

const HomeRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchResult /> },
    ],
  },
];

export default HomeRoutes;
