import api from "../index";

const AuthAPI = {
  login: (credentials) => api.post("/login", credentials),
  logout: () => api.post("/logout"),
};

export default AuthAPI;
