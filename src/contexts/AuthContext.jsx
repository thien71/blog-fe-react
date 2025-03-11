import { createContext, useContext, useState, useEffect } from "react";
import UserAPI from "../apis/endpoints/users";

// Tạo Context
const AuthContext = createContext();

// Provider chứa user
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserAPI.getCurrentUser();
        setUser(response.data?.data);
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để lấy user
export const useAuth = () => useContext(AuthContext);
