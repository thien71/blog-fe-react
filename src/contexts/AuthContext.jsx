import { createContext, useContext, useState, useEffect } from "react";
import AuthAPI from "../apis/endpoints/auth";
import UserAPI from "../apis/endpoints/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
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
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await AuthAPI.login(credentials);
      const newToken = response.data.token;

      localStorage.setItem("authToken", newToken);
      setToken(newToken);

      const userResponse = await UserAPI.getCurrentUser();
      setUser(userResponse.data?.data);

      return { success: true };
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Lỗi đăng nhập",
      };
    }
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
      localStorage.removeItem("authToken");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
