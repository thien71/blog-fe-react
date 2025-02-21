import api from "../index";

const TagAPI = {
  getAll: () => api.get("/tags"),
  getById: (id) => api.get(`/tags/${id}`),
  create: (tagData) => api.post("/tags", tagData),
  update: (id, tagData) => api.put(`/tags/${id}`, tagData),
  delete: (id) => api.delete(`/tags/${id}`),
};

export default TagAPI;
