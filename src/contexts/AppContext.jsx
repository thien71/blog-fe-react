import { AuthProvider } from "./AuthContext";
import { CategoryProvider } from "./CategoryContext";
import { TagProvider } from "./TagContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TagProvider>{children}</TagProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};
