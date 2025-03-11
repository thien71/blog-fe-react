import React, { useState, useEffect } from "react";
import { Input, Select } from "../../../components";

import UserAPI from "../../../apis/endpoints/users";
import CategoryAPI from "../../../apis/endpoints/categories";

const status = [
  { value: "", label: "Trạng thái" },
  { value: "published", label: "Công khai" },
  { value: "hidden", label: "Đã ẩn" },
];

const PostSearchbar = ({
  search,
  onSearchChange,
  categoryFilter,
  setCategoryFilter,
  authorFilter,
  setAuthorFilter,
  statusFilter,
  setStatusFilter,
  viewMinFilter,
  setViewMinFilter,
  viewMaxFilter,
  setViewMaxFilter,
  visibleFilters = { category: true, author: true, status: true, views: true },
}) => {
  const [categories, setCategories] = useState([
    { value: "", label: "Danh mục" },
  ]);
  const [authors, setAuthors] = useState([{ value: "", label: "Tác giả" }]);

  useEffect(() => {
    if (visibleFilters.category) {
      CategoryAPI.getAll()
        .then((response) => {
          setCategories([
            { value: "", label: "Danh mục" },
            ...response.data.data.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]);
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }

    if (visibleFilters.author) {
      UserAPI.getAll()
        .then((response) => {
          setAuthors([
            { value: "", label: "Tác giả" },
            ...response.data.data
              .filter((user) => user.role === "author")
              .map((author) => ({
                value: author.id,
                label: author.name || author.email,
              })),
          ]);
        })
        .catch((error) => console.error("Error fetching authors:", error));
    }
  }, [visibleFilters]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {/* Ô tìm kiếm */}
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChange={onSearchChange}
      />

      {/* Bộ lọc danh mục */}
      {visibleFilters.category && (
        <Select
          options={categories}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      )}

      {/* Bộ lọc tác giả */}
      {visibleFilters.author && (
        <Select
          options={authors}
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
      )}

      {/* Bộ lọc trạng thái */}
      {visibleFilters.status && (
        <Select
          options={status}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      )}

      {/* Bộ lọc lượt xem */}
      {visibleFilters.views && (
        <div className="flex gap-1 items-center justify-center border px-2">
          <span className="inline-block text-left">Lượt xem</span>
          <input
            type="number"
            placeholder="Min"
            value={viewMinFilter}
            onChange={(e) => setViewMinFilter(e.target.value)}
            min="0"
            className="outline-none p-1 rounded flex-1 w-full text-center"
          />
          <span className="inline-block text-center text-sm">đến</span>
          <input
            type="number"
            placeholder="Max"
            value={viewMaxFilter}
            onChange={(e) => setViewMaxFilter(e.target.value)}
            min="0"
            className="outline-none p-1 rounded flex-1 w-full text-center"
          />
        </div>
      )}
    </div>
  );
};

export default PostSearchbar;
