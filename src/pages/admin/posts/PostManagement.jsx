import { useEffect, useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { useNavigate } from "react-router-dom";
import PostAPI from "../../../apis/endpoints/posts";
import {
  Table,
  Pagination,
  ConfirmModal,
  PostSearchBar,
  CategoryTagTableActions,
  PostManagementHeader,
} from "../../../components";

import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import { useAuth } from "../../../contexts/AuthContext";

const PostManagement = () => {
  const { user, loading } = useAuth();

  const [filters, setFilters] = useState({
    search: "",
    categoryFilter: "",
    authorFilter: "",
    statusFilter: "",
    viewMinFilter: "",
    viewMaxFilter: "",
  });

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const {
    search,
    categoryFilter,
    authorFilter,
    statusFilter,
    viewMinFilter,
    viewMaxFilter,
  } = filters;

  const {
    isOpen: isConfirmOpen,
    selectedItem: postToConfirm,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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
    posts,
    search,
    categoryFilter,
    authorFilter,
    statusFilter,
    viewMinFilter,
    viewMaxFilter,
  ]);

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedPosts,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPosts, 5);

  const fetchPosts = useCallback(async () => {
    if (loading || !user) return;

    try {
      let response;
      if (user.role === "admin") {
        response = await PostAPI.getAll();
      } else if (user.role === "author") {
        response = await PostAPI.getByAuthor(user.id);
      }

      if (response?.data?.data?.length) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải posts", error);
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading) {
      fetchPosts();
    }
  }, [fetchPosts, loading]);

  const handleEdit = useCallback(
    (postId) => {
      if (!user) return;

      const basePath = user.role === "admin" ? "/admin" : "/author";
      navigate(`${basePath}/posts/edit/${postId}`);
    },
    [navigate, user]
  );

  const handleConfirmAction = useCallback(async () => {
    if (!postToConfirm) return;

    try {
      await PostAPI.delete(postToConfirm.id);
      await fetchPosts();
    } catch (error) {
      console.error("Lỗi khi xác nhận hành động", error);
    } finally {
      closeConfirmModal();
    }
  }, [postToConfirm, closeConfirmModal, fetchPosts]);

  const renderStatus = useCallback((status) => {
    return status === "published" ? (
      <span className="text-green-500">Công khai</span>
    ) : (
      <span className="text-red-500">Đã ẩn</span>
    );
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Đang tải...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <PostManagementHeader />

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
        // Chỉ hiển thị filter author nếu là admin
        visibleFilters={{
          category: true,
          author: user?.role === "admin",
          status: true,
          views: true,
        }}
      />

      {posts.length === 0 ? (
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
                <th className="border p-2">
                  {user.role === "admin" ? "Tác giả" : "Ngày cập nhật"}
                </th>
                <th className="border p-2">Ngày tạo</th>
                <th className="border p-2">Lượt xem</th>
                <th className="border p-2">Trạng thái</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr key={post.id} className="text-center">
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
                  <td className="border p-2">{post.category.name}</td>
                  <td className="border p-2 min-w-40">
                    {user.role === "admin" ? (
                      <p>{post.author.name}</p>
                    ) : (
                      <p>
                        {format(
                          new Date(post.updated_at),
                          " HH:mm - dd/MM/yyyy",
                          {
                            locale: vi,
                          }
                        )}
                      </p>
                    )}
                  </td>
                  <td className="border p-2 max-w-28">
                    <p>
                      {format(new Date(post.created_at), "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </td>
                  <td className="border p-2">{post.views}</td>
                  <td className="border p-2">{renderStatus(post.status)}</td>
                  <td className="border p-2">
                    <CategoryTagTableActions
                      data={post}
                      onEdit={() => handleEdit(post.id)}
                      onDelete={openConfirmModal}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination
            total={totalItems}
            perPage={itemsPerPage}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}

      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          title="Xác nhận xoá bài viết"
          message="Bạn có chắc chắn muốn xoá bài viết này "
          onConfirm={handleConfirmAction}
          onCancel={closeConfirmModal}
        />
      )}
    </div>
  );
};

export default PostManagement;
