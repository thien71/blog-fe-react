import { useEffect, useState } from "react";
import PostAPI from "../../apis/endpoints/posts";
import {
  Table,
  Pagination,
  EditUserModal,
  CreateUserModal,
  ConfirmModal,
  PostSearchBar,
  CategoryTagTableActions,
  Button,
  PostManagementHeader,
} from "../../components";

import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

const PostApprove = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMinFilter, setViewMinFilter] = useState("");
  const [viewMaxFilter, setViewMaxFilter] = useState("");
  const [posts, setPosts] = useState([]);

  const {
    isOpen: isEditOpen,
    selectedItem: selectedUser,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const {
    isOpen: isConfirmOpen,
    selectedItem: userToConfirm,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const filteredPosts = posts.filter((post) => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());

    // Lọc theo danh mục
    const matchesCategory =
      !categoryFilter || post.category.id === Number(categoryFilter);

    // Lọc theo tác giả
    const matchesAuthor =
      !authorFilter || post.author.id === Number(authorFilter);

    // Lọc theo trạng thái
    const matchesStatus = !statusFilter || post.status === statusFilter;

    // Lọc theo lượt xem
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

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedUsers,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPosts, 5);

  const fetchUsers = async () => {
    try {
      const response = await PostAPI.getAll();
      if (response.data.data?.length) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải posts", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMinFilter={viewMinFilter}
        setViewMinFilter={setViewMinFilter}
        viewMaxFilter={viewMaxFilter}
        setViewMaxFilter={setViewMaxFilter}
      />

      <Table>
        <thead>
          <tr>
            <th className="border p-2">Id</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Danh mục</th>
            <th className="border p-2">Tác giả</th>
            <th className="border p-2">Ngày tạo</th>
            <th className="border p-2">Lượt xem</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2 max-w-20">
                <img
                  src={user.thumbnail || "https://placehold.co/80x48"}
                  alt={user.title}
                  className="aspect-[5/3] object-cover w-full bg-gray-300 rounded-md"
                />
              </td>
              <td className="border p-2 text-left max-w-sm">
                <p className="line-clamp-2">{user.title}</p>
              </td>
              <td className="border p-2">{user.category.name}</td>
              <td className="border p-2 min-w-40">
                <p className="">{user.author.name}</p>
              </td>
              <td className="border p-2 max-w-28">
                <p className="">{user.created_at}</p>
              </td>
              <td className="border p-2">{user.views}</td>
              <td className="border p-2">
                {user.status === "published" ? (
                  <span className="text-green-500">Công khai</span>
                ) : (
                  <span className="text-red-500">Đã ẩn</span>
                )}
              </td>
              <td className="border p-2">
                <CategoryTagTableActions
                  data={user}
                  onEdit={openEditModal}
                  onConfirm={openConfirmModal}
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

      {isEditOpen && (
        <EditUserModal
          isOpen={isEditOpen}
          user={selectedUser}
          onClose={() => closeEditModal()}
          onUpdated={handleUpdated}
        />
      )}

      {isCreateOpen && (
        <CreateUserModal
          isOpen={isCreateOpen}
          onClose={() => closeCreateModal()}
          onCreated={handleCreated}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          title={`Xác nhận ${
            userToConfirm?.is_disabled ? "mở khóa" : "vô hiệu hóa"
          }`}
          message={`Bạn có chắc chắn muốn ${
            userToConfirm?.is_disabled ? "mở khóa" : "vô hiệu hóa"
          } người dùng ${userToConfirm?.name}?`}
          onConfirm={handleConfirmAction}
          onCancel={() => closeConfirmModal()}
        />
      )}
    </div>
  );
};

export default PostApprove;
