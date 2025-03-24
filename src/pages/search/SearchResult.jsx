import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchAPI from "../../hooks/useFetchAPI";
import SearchAPI from "../../apis/endpoints/search";
import { useCategory } from "../../contexts/CategoryContext";
import { useTag } from "../../contexts/TagContext";
import { Button, Pagination } from "../../components";
import PostItem from "../post/components/PostItem";
import usePagination from "../../hooks/usePagination";
import useDebounce from "../../hooks/useDebounce";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialTag = searchParams.get("tag") || "";
  const initialSort = searchParams.get("sort") || "";
  const initialLimit = parseInt(searchParams.get("limit"), 10) || 10;

  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);
  const [sort, setSort] = useState(initialSort);
  const [limit, setLimit] = useState(initialLimit);

  const perPage = 16;
  const { categories } = useCategory();
  const { tags } = useTag();
  const debouncedQ = useDebounce(q, 500);
  const { data, loading, error, refetch } = useFetchAPI(SearchAPI.search, [
    { q: debouncedQ, category, tag, sort, limit },
  ]);

  const { currentPage, setCurrentPage, paginatedData, totalItems } =
    usePagination(data || [], perPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (q) params.q = q;
    if (category) params.category = category;
    if (tag) params.tag = tag;
    if (sort) params.sort = sort;
    params.limit = limit;
    setSearchParams(params);
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-6 pt-16 pb-6">
      <div className="mb-6 p-2 bg-gray-100 rounded-lg shadow">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full p-2 border border-primary rounded-md outline-none"
            />
          </div>

          <div className="min-w-[150px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md outline-none"
            >
              <option value="">Chọn danh mục</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="min-w-[150px]">
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full p-2 border rounded-md outline-none"
            >
              <option value="">Chọn tag</option>
              {tags &&
                tags.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="min-w-[150px]">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-2 border rounded-md outline-none"
            >
              <option value="latest">Mới nhất</option>
              <option value="popular">Phổ biến nhất</option>
            </select>
          </div>

          <div>
            <Button type="submit" variant="primary">
              Tìm kiếm
            </Button>
          </div>
        </form>
      </div>

      <div className="">
        <h1 className="text-2xl font-bold mb-6">
          Kết quả tìm kiếm {q && `cho: "${q}"`}{" "}
          {category && `, Danh mục: "${category}"`} {tag && `, Tag: "${tag}"`}
        </h1>
        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && data && data.length === 0 && (
          <p>Không có kết quả nào được tìm thấy.</p>
        )}
        <ul className="grid grid-cols-2 gap-x-16">
          {paginatedData.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>

      {data && data.length > perPage && (
        <Pagination
          total={totalItems}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default SearchResult;
