import api from "../index";

const PostAPI = {
  getAll: () => api.get("/posts"),
  getBySlug: (slug) => api.get(`/posts/${slug}`),
  create: (postData) => api.post("/posts", postData),
  update: (id, postData) => api.put(`/posts/${id}`, postData),
  delete: (id) => api.delete(`/posts/${id}`),
  getByAuthor: (authorId) => api.get(`/posts/author/${authorId}`),
};

export default PostAPI;
