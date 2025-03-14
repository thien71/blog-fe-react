import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={AppRoutes} />
    </AppProvider>
  );
}

export default App;
