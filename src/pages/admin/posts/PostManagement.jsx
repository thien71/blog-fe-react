import { useEffect, useState } from "react";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import PostAPI from "../../../apis/endpoints/posts";
import UserAPI from "../../../apis/endpoints/users";
import {
  Table,
  Pagination,
  EditUserModal,
  CreatePostModal,
  ConfirmModal,
  PostSearchBar,
  CategoryTagTableActions,
  PostManagementHeader,
} from "../../../components";

import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";

const PostManagement = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMinFilter, setViewMinFilter] = useState("");
  const [viewMaxFilter, setViewMaxFilter] = useState("");
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);

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
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());

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

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedPosts,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPosts, 5);

  const fetchUserRole = async () => {
    try {
      const response = await UserAPI.getCurrentUser();
      setRole(response.data?.data.role || "author");
      setUserId(response.data?.data.id);
    } catch (error) {
      console.error("Lỗi khi lấy role:", error);
      setRole("author");
    }
  };

  const fetchPosts = async () => {
    try {
      let response;
      if (role === "admin") {
        response = await PostAPI.getAll();
      } else if (role === "author" && userId) {
        response = await PostAPI.getByAuthor(userId);
      }

      if (response?.data?.data?.length) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải posts", error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (role) fetchPosts();
  }, [role, userId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <PostManagementHeader />

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
                <p className="">{post.author.name}</p>
              </td>
              <td className="border p-2 max-w-28">
                <p className="">
                  {format(new Date(post.created_at), "dd/MM/yyyy", {
                    locale: vi,
                  })}
                </p>
              </td>
              <td className="border p-2">{post.views}</td>
              <td className="border p-2">
                {post.status === "published" ? (
                  <span className="text-green-500">Công khai</span>
                ) : (
                  <span className="text-red-500">Đã ẩn</span>
                )}
              </td>
              <td className="border p-2">
                <CategoryTagTableActions
                  data={post}
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

      {/* {isConfirmOpen && (
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
      )} */}
    </div>
  );
};

export default PostManagement;
