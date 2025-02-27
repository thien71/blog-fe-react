import api from "../index";

const UserAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  getCurrentUser: () => api.get("/users/me"),
  // update: (id, formData) => api.put(`/users/${id}`, formData),
  update: (id, formData) =>
    api.post(`/users/${id}?_method=PUT`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  delete: (id) => api.delete(`/users/${id}`),
};

export default UserAPI;
