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
}) => {
  const [categories, setCategories] = useState([
    { value: "", label: "Danh mục" },
  ]);
  const [authors, setAuthors] = useState([{ value: "", label: "Tác giả" }]);

  useEffect(() => {
    CategoryAPI.getAll()
      .then((response) => {
        const categoryOptions = [
          { value: "", label: "Danh mục" },
          ...response.data.data.map((category) => ({
            value: category.id,
            label: category.name,
          })),
        ];

        setCategories(categoryOptions);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    UserAPI.getAll()
      .then((response) => {
        const authorOptions = [
          { value: "", label: "Tác giả" },
          ...response.data.data
            .filter((user) => user.role === "author")
            .map((author) => ({
              value: author.id,
              label: author.name || author.email,
            })),
        ];
        setAuthors(authorOptions);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChange={onSearchChange}
      />
      <Select
        options={categories}
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />
      <Select
        options={authors}
        value={authorFilter}
        onChange={(e) => setAuthorFilter(e.target.value)}
      />
      {statusFilter && (
        <Select
          options={status}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      )}

      {viewMinFilter && (
        <div className="flex gap-1 items-center justify-center border px-2">
          <span className="inline-block text-left">Lượt xem</span>
          <input
            type="number"
            placeholder="Min"
            value={viewMinFilter}
            onChange={(e) => setViewMinFilter(e.target.value)}
            min="0"
            className="placeholder:italic outline-none p-1 rounded flex-1 w-full text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="inline-block text-center text-sm">đến</span>
          <input
            type="number"
            placeholder="Max"
            value={viewMaxFilter}
            onChange={(e) => setViewMaxFilter(e.target.value)}
            min="0"
            className="placeholder:italic outline-none p-1 rounded flex-1 w-full text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      )}
    </div>
  );
};

export default PostSearchbar;
