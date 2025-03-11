import api from "../index";

const PostAPI = {
  getAll: () => api.get("/posts"),
  getBySlug: (slug) => api.get(`/posts/${slug}`),
  getById: (id) => api.get(`/posts/id/${id}`),
  getDraft: () => api.get(`/posts/draft/me`),
  getPending: () => api.get(`/admin/posts/pending`),
  create: (postData) =>
    api.post(`/posts`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (id, postData) =>
    api.post(`/posts/${id}`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateDraft: (id, postData) =>
    api.post(`/posts/${id}/draft?_method=PUT`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  submitPost: (id, postData) =>
    api.post(`/posts/${id}/submit?_method=PUT`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  approve: (id) => api.put(`/posts/${id}/approve`),
  reject: (id) => api.put(`/posts/${id}/reject`),

  delete: (id) => api.delete(`/posts/${id}`),
  forceDelete: (id) => api.delete(`/posts/${id}/force`),
  getByAuthor: (authorId) => api.get(`/posts/author/${authorId}`),
  getLatest: (limit) =>
    api.get(limit ? `/posts/latest?limit=${limit}` : "/posts/latest"),
  getPopular: (limit) =>
    api.get(limit ? `/posts/popular?limit=${limit}` : "/posts/popular"),
  getRandom: (limit) =>
    api.get(limit ? `/posts/random?limit=${limit}` : "/posts/random"),
  getRandomByCategory: (limit) =>
    api.get(
      limit
        ? `/posts/random-by-category?limit=${limit}`
        : "/posts/random-by-category"
    ),
};

export default PostAPI;
