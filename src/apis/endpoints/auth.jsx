import api from "../index";

const AuthAPI = {
  login: (credentials) => api.post("/login", credentials),
  logout: () => api.post("/logout"),
  register: (data) => api.post("/admin/register", data),
};

export default AuthAPI;
