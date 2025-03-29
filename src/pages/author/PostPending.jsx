import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import PostAPI from "../../apis/endpoints/posts";
import {
  Table,
  Pagination,
  Button,
  PostManagementHeader,
  PostSearchBar,
  PreviewPostModal,
} from "../../components";
import { FiEye } from "react-icons/fi";
import useServerPagination from "../../hooks/useServerPagination";
import useModal from "../../hooks/useModal";

const PostPending = () => {
  // const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    categoryFilter: "",
    authorFilter: "",
    statusFilter: "",
    viewMinFilter: "",
    viewMaxFilter: "",
  });

  const {
    search,
    categoryFilter,
    authorFilter,
    statusFilter,
    viewMinFilter,
    viewMaxFilter,
  } = filters;

  const {
    isOpen: isPreviewOpen,
    openModal: openPreviewModal,
    closeModal: closePreviewModal,
  } = useModal();

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

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

  // Lọc dữ liệu trên dữ liệu đã phân trang từ server
  const filteredPosts = useMemo(() => {
    return paginatedPosts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !categoryFilter || post.category.id === Number(categoryFilter);

      const matchesAuthor =
        !authorFilter || post.author.id === Number(authorFilter);

      const matchesStatus = !statusFilter || post.status === statusFilter;

      const matchesViews =
        (!viewMinFilter || post.views >= Number(viewMinFilter)) &&
        (!viewMaxFilter || post.views <= Number(viewMaxFilter));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAuthor &&
        matchesStatus &&
        matchesViews
      );
    });
  }, [
    paginatedPosts,
    search,
    categoryFilter,
    authorFilter,
    statusFilter,
    viewMinFilter,
    viewMaxFilter,
  ]);

  const handleView = (post) => {
    setSelectedPost(post);
    openPreviewModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <PostManagementHeader title="Chờ duyệt" />

      <PostSearchBar
        search={search}
        onSearchChange={(e) => updateFilter("search", e.target.value)}
        categoryFilter={categoryFilter}
        setCategoryFilter={(value) => updateFilter("categoryFilter", value)}
        authorFilter={authorFilter}
        setAuthorFilter={(value) => updateFilter("authorFilter", value)}
        statusFilter={statusFilter}
        setStatusFilter={(value) => updateFilter("statusFilter", value)}
        viewMinFilter={viewMinFilter}
        setViewMinFilter={(value) => updateFilter("viewMinFilter", value)}
        viewMaxFilter={viewMaxFilter}
        setViewMaxFilter={(value) => updateFilter("viewMaxFilter", value)}
        visibleFilters={{
          category: true,
          author: false,
          status: false,
          views: false,
        }}
      />

      {paginationLoading ? (
        <div className="text-center py-10">
          <p>Đang tải...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <p>Không có bài viết nào</p>
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
                <th className="border p-2">Tags</th>
                <th className="border p-2">Ngày tạo</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="text-center hover:bg-sky-50 cursor-pointer"
                  onClick={() => handleView(post)}
                >
                  <td className="border p-2">{post.id}</td>
                  <td className="border p-2 max-w-20">
                    <img
                      src={post.thumbnail || "https://placehold.co/80x48"}
                      alt={post.title}
                      className="aspect-[5/3] object-cover w-full bg-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border p-2 text-left max-w-sm">
                    <p className="line-clamp-2">{post.title}</p>
                  </td>
                  <td className="border p-2">{post?.category?.name}</td>
                  <td className="border p-2 min-w-40">
                    <p>{post?.tags?.map((tag) => tag.name).join(", ")}</p>
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
                        variant="outline"
                        className="border-blue-500 text-hover hover:bg-blue-200 block"
                        onClick={() => handleView(post.id)}
                      >
                        <FiEye />
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
          {isPreviewOpen && (
            <PreviewPostModal
              isOpen={isPreviewOpen}
              onClose={closePreviewModal}
              post={selectedPost}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostPending;
