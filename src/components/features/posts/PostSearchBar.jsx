import React, { useState, useEffect, useCallback } from "react";
import { Input, Select } from "../../../components";
import UserAPI from "../../../apis/endpoints/users";
import CategoryAPI from "../../../apis/endpoints/categories";

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
  const [categories, setCategories] = useState([
    { value: "", label: "Danh mục" },
  ]);
  const [authors, setAuthors] = useState([{ value: "", label: "Tác giả" }]);
  const [isLoading, setIsLoading] = useState({
    categories: false,
    authors: false,
  });

  const fetchCategories = useCallback(async () => {
    if (!visibleFilters.category || isLoading.categories) return;

    setIsLoading((prev) => ({ ...prev, categories: true }));
    try {
      const response = await CategoryAPI.getAll();
      setCategories([
        { value: "", label: "Danh mục" },
        ...response.data.data.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, categories: false }));
    }
  }, [visibleFilters.category, isLoading.categories]);

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
    // Chỉ fetch categories khi cần
    if (visibleFilters.category && categories.length <= 1) {
      fetchCategories();
    }

    // Chỉ fetch authors khi cần
    if (visibleFilters.author && authors.length <= 1) {
      fetchAuthors();
    }
  }, [
    visibleFilters,
    categories.length,
    authors.length,
    fetchCategories,
    fetchAuthors,
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChange={onSearchChange}
      />

      {visibleFilters.category && (
        <Select
          options={categories}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          disabled={isLoading.categories}
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

// import React, { useState, useEffect } from "react";
// import { Input, Select } from "../../../components";
// import UserAPI from "../../../apis/endpoints/users";
// import CategoryAPI from "../../../apis/endpoints/categories";

// const status = [
//   { value: "", label: "Trạng thái" },
//   { value: "published", label: "Công khai" },
//   { value: "hidden", label: "Đã ẩn" },
// ];

// const PostSearchBar = ({
//   search,
//   onSearchChange,
//   categoryFilter,
//   setCategoryFilter,
//   authorFilter,
//   setAuthorFilter,
//   statusFilter,
//   setStatusFilter,
//   viewMinFilter,
//   setViewMinFilter,
//   viewMaxFilter,
//   setViewMaxFilter,
//   visibleFilters = { category: true, author: true, status: true, views: true },
// }) => {
//   const [categories, setCategories] = useState([
//     { value: "", label: "Danh mục" },
//   ]);
//   const [authors, setAuthors] = useState([{ value: "", label: "Tác giả" }]);

//   // Dùng state để kiểm soát việc gọi API
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false);
//   const [authorsLoaded, setAuthorsLoaded] = useState(false);

//   useEffect(() => {
//     // Chỉ fetch categories nếu chưa có data
//     if (visibleFilters.category && !categoriesLoaded) {
//       CategoryAPI.getAll()
//         .then((response) => {
//           setCategories([
//             { value: "", label: "Danh mục" },
//             ...response.data.data.map((category) => ({
//               value: category.id,
//               label: category.name,
//             })),
//           ]);
//           setCategoriesLoaded(true); // Đánh dấu đã load xong
//         })
//         .catch((error) => console.error("Error fetching categories:", error));
//     }

//     // Chỉ fetch authors nếu chưa có data
//     if (visibleFilters.author && !authorsLoaded) {
//       UserAPI.getAll()
//         .then((response) => {
//           setAuthors([
//             { value: "", label: "Tác giả" },
//             ...response.data.data
//               .filter((user) => user.role === "author")
//               .map((author) => ({
//                 value: author.id,
//                 label: author.name || author.email,
//               })),
//           ]);
//           setAuthorsLoaded(true); // Đánh dấu đã load xong
//         })
//         .catch((error) => console.error("Error fetching authors:", error));
//     }
//   }, [visibleFilters, categoriesLoaded, authorsLoaded]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//       <Input
//         placeholder="Tìm kiếm bài viết..."
//         value={search}
//         onChange={onSearchChange}
//       />

//       {visibleFilters.category && (
//         <Select
//           options={categories}
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//         />
//       )}

//       {visibleFilters.author && (
//         <Select
//           options={authors}
//           value={authorFilter}
//           onChange={(e) => setAuthorFilter(e.target.value)}
//         />
//       )}

//       {visibleFilters.status && (
//         <Select
//           options={status}
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         />
//       )}

//       {visibleFilters.views && (
//         <div className="flex gap-1 items-center justify-center border px-2">
//           <span className="inline-block text-left">Lượt xem</span>
//           <input
//             type="number"
//             placeholder="Min"
//             value={viewMinFilter}
//             onChange={(e) => setViewMinFilter(e.target.value)}
//             min="0"
//             className="outline-none p-1 rounded flex-1 w-full text-center"
//           />
//           <span className="inline-block text-center text-sm">đến</span>
//           <input
//             type="number"
//             placeholder="Max"
//             value={viewMaxFilter}
//             onChange={(e) => setViewMaxFilter(e.target.value)}
//             min="0"
//             className="outline-none p-1 rounded flex-1 w-full text-center"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostSearchBar;
