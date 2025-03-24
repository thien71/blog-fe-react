import api from "../index";

const SearchAPI = {
  search: ({ q = "", category = "", tag = "", sort = "", limit = 3 } = {}) =>
    api.get(`/search`, {
      params: { q, category, tag, sort, limit },
    }),
};

export default SearchAPI;
