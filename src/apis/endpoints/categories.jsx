import api from "../index";

const CategoryAPI = {
  getAll: (params) => api.get("/categories", { params }),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryData) => api.post("/categories", categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
};

export default CategoryAPI;
