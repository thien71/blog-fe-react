import api from "../index";

const PostAPI = {
  getAll: (params) => api.get("/posts", { params }),
  getBySlug: (slug) => api.get(`/posts/${slug}`),
  getById: (id) => api.get(`/posts/id/${id}`),
  getDraft: () => api.get(`/posts/draft/me`),
  getPending: () => api.get(`/admin/posts/pending`),
  getRejected: () => api.get(`/admin/posts/reject`),
  getByAuthor: (authorId, params) =>
    api.get(`/posts/author/${authorId}`, { params }),
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
  getRelated: (id, limit = 5) =>
    api.get(`/posts/${id}/related`, {
      params: { limit },
    }),
  getRelatedCategory: (id, limit = 5) =>
    api.get(`/posts/${id}/related/category`, {
      params: { limit },
    }),
  getRelatedTag: (id, limit = 5) =>
    api.get(`/posts/${id}/related/tag`, {
      params: { limit },
    }),

  create: (postData) =>
    api.post(`/posts`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  createDraft: (postData) =>
    api.post(`/posts/draft`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  uploadImage: (imageData) =>
    api.post(`/upload-image`, imageData, {
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
  approve: (id) => api.put(`/posts/${id}/approve`),
  reject: (id) => api.put(`/posts/${id}/reject`),

  delete: (id) => api.delete(`/posts/${id}`),
  forceDelete: (id) => api.delete(`/posts/${id}/force`),
};

export default PostAPI;
