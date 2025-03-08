import api from "../index";

const PostAPI = {
  getAll: () => api.get("/posts"),
  getBySlug: (slug) => api.get(`/posts/${slug}`),
  // create: (postData) => api.post("/posts", postData),
  create: (postData) =>
    api.post(`/posts`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  update: (id, postData) => api.put(`/posts/${id}`, postData),
  delete: (id) => api.delete(`/posts/${id}`),
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
