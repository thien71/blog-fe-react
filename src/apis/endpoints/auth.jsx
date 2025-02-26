import api from "../index";

const AuthAPI = {
  login: (credentials) =>
    api.post("/login", JSON.stringify(credentials), {
      headers: { "Content-Type": "application/json" },
    }),
  logout: () => api.post("/logout"),
};

export default AuthAPI;
