import React, { useState, useEffect, useCallback } from "react";
import { Input, Select } from "../../../components";
import UserAPI from "../../../apis/endpoints/users";
import { useCategory } from "../../../contexts/CategoryContext";

const STATUS_OPTIONS = [
  { value: "", label: "Trạng thái" },
  { value: "published", label: "Công khai" },
  { value: "hidden", label: "Đã ẩn" },
];

const PostSearchBar = ({
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
  const { categories: categoryData, loading: categoriesLoading } =
    useCategory();

  // Chuyển đổi dữ liệu categories từ context thành dạng { value, label }
  const categoryOptions = [
    { value: "", label: "Danh mục" },
    ...categoryData.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const [authors, setAuthors] = useState([{ value: "", label: "Tác giả" }]);
  const [isLoading, setIsLoading] = useState({
    authors: false,
  });

  const fetchAuthors = useCallback(async () => {
    if (!visibleFilters.author || isLoading.authors) return;

    setIsLoading((prev) => ({ ...prev, authors: true }));
    try {
      const response = await UserAPI.getAll();
      setAuthors([
        { value: "", label: "Tác giả" },
        ...response.data.data.map((author) => ({
          value: author.id,
          label: author.name || author.email,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, authors: false }));
    }
  }, [visibleFilters.author, isLoading.authors]);

  useEffect(() => {
    if (visibleFilters.author && authors.length <= 1) {
      fetchAuthors();
    }
  }, [visibleFilters, authors.length, fetchAuthors]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChange={onSearchChange}
      />

      {visibleFilters.category && (
        <Select
          options={categoryOptions}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          disabled={categoriesLoading}
        />
      )}

      {visibleFilters.author && (
        <Select
          options={authors}
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          disabled={isLoading.authors}
        />
      )}

      {visibleFilters.status && (
        <Select
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      )}

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

export default PostSearchBar;
