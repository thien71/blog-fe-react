import api from "../index";

const TagAPI = {
  getAll: () => api.get("/tags"),
  getById: (id) => api.get(`/tags/${id}`),
  create: (tagData) => api.post("/tags", tagData),
  // update: (id, tagData) => api.put(`/tags/${id}`, tagData),
  update: (id, tagData) =>
    api.post(`/tags/${id}?_method=PUT`, tagData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  delete: (id) => api.delete(`/tags/${id}`),
};

export default TagAPI;
