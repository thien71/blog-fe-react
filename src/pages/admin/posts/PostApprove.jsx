import { useState, useCallback } from "react";
import PostAPI from "../../../apis/endpoints/posts";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import {
  Table,
  Pagination,
  PostSearchBar,
  Button,
  PostManagementHeader,
} from "../../../components";
import { TiTick } from "react-icons/ti";
import { IoIosRemoveCircle } from "react-icons/io";
import useServerPagination from "../../../hooks/useServerPagination";

const PostApprove = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  // Nếu API hỗ trợ filter, bạn nên truyền các tham số search, category, author vào đây
  const fetchPendingPosts = useCallback(async (page = 1) => {
    const response = await PostAPI.getPending({ page });
    return {
      data: response?.data?.data || [],
      meta: response?.data?.meta || null,
    };
  }, []);

  const {
    data: paginatedPosts,
    meta,
    currentPage: page,
    setCurrentPage: setPage,
    loading: paginationLoading,
    fetchData,
  } = useServerPagination(fetchPendingPosts, 1);

  // Nếu API chưa hỗ trợ filter, bạn có thể lọc dữ liệu của trang hiện tại (lưu ý chỉ áp dụng trên dữ liệu đã phân trang)
  const filteredPosts = paginatedPosts.filter((post) => {
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter || post.category.id === Number(categoryFilter);

    const matchesAuthor =
      !authorFilter || post.author.id === Number(authorFilter);

    return matchesSearch && matchesCategory && matchesAuthor;
  });

  const handleApprove = async (id) => {
    try {
      await PostAPI.approve(id);
      await fetchData(page);
    } catch (error) {
      console.error("Lỗi khi duyệt bài:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await PostAPI.reject(id);
      await fetchData(page);
    } catch (error) {
      console.error("Lỗi khi từ chối bài:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <PostManagementHeader title="Duyệt bài" />

      <PostSearchBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        visibleFilters={{
          category: true,
          author: true,
        }}
      />

      {paginationLoading ? (
        <div className="text-center py-10">
          <p>Đang tải...</p>
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">Ảnh</th>
                <th className="border p-2">Tiêu đề</th>
                <th className="border p-2">Danh mục</th>
                <th className="border p-2">Tác giả</th>
                <th className="border p-2">Ngày tạo</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="text-center">
                  <td className="border p-2">{post.id}</td>
                  <td className="border p-2 max-w-20">
                    <img
                      src={post.thumbnail || "https://placehold.co/80x48"}
                      alt={post.title}
                      className="aspect-[5/3] object-cover w-full bg-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border p-2 text-left max-w-sm min-w-80">
                    <p className="line-clamp-2">{post.title}</p>
                  </td>
                  <td className="border p-2">{post.category.name}</td>
                  <td className="border p-2 min-w-40">
                    <p>{post.author.name}</p>
                  </td>
                  <td className="border p-2 max-w-28">
                    <p>
                      {format(new Date(post.created_at), "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-4 items-center">
                      <Button
                        variant="danger"
                        className="border-blue-500 text-hover hover:bg-blue-200 block"
                        onClick={() => handleReject(post.id)}
                      >
                        <IoIosRemoveCircle size={24} />
                      </Button>

                      <Button
                        variant="success"
                        onClick={() => handleApprove(post.id)}
                      >
                        <TiTick size={24} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {meta && (
            <Pagination
              total={meta.total}
              perPage={meta.per_page}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostApprove;
