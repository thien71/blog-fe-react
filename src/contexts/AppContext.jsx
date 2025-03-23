import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CategoryProvider>{children}</CategoryProvider>
    </AuthProvider>
  );
};
