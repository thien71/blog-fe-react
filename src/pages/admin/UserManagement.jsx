import { useEffect, useState } from "react";
import UserAPI from "../../apis/endpoints/users";
import {
  Button,
  Input,
  Select,
  Table,
  Pagination,
  EditUserModal,
  CreateUserModal,
  ConfirmModal,
} from "../../components";

import defaultAvatar from "../../assets/images/default_avatar.jpg";
import { FaBan, FaUnlock } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";

const filters = [
  { value: "", label: "Vai trò" },
  { value: "admin", label: "Admin" },
  { value: "author", label: "Author" },
];

const status = [
  { value: "", label: "Trạng thái" },
  { value: "Active", label: "Hoạt động" },
  { value: "Disabled", label: "Vô hiệu hóa" },
];

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // Xác định hành động khóa/mở khóa
  const [userToConfirm, setUserToConfirm] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await UserAPI.getAll();
      if (response.data.data?.length) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = filter ? user.role === filter : true;
    const matchesStatus =
      statusFilter === "Active"
        ? !user.deleted_at
        : statusFilter === "Disabled"
        ? user.deleted_at
        : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice((page - 1) * 5, page * 5);

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const openCreateUserModal = () => {
    setSelectedUser(null);
    setIsCreateUserModalOpen(true);
  };

  const handleUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };

  const openConfirmModal = (user, action) => {
    setUserToConfirm(user);
    setConfirmAction(action);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!userToConfirm) return;

    try {
      if (confirmAction === "disable") {
        await UserAPI.delete(userToConfirm.id);
      } else if (confirmAction === "enable") {
        await UserAPI.restore(userToConfirm.id);
      }
      fetchUsers();
    } catch (error) {
      alert(
        `Có lỗi xảy ra khi ${
          confirmAction === "disable" ? "vô hiệu hóa" : "mở khóa"
        } người dùng!`
      );
    }

    setIsConfirmModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          options={filters}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Select
          options={status}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <Button
          variant="primary"
          size="md"
          onClick={openCreateUserModal}
          className="gap-2"
        >
          <IoIosAddCircle size={20} />
          <span>Tạo người dùng mới</span>
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="border p-2">Avatar</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">
                <img
                  src={user.avatar || defaultAvatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border mx-auto"
                />
              </td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 text-center">{user.role}</td>
              <td className="border p-2 text-center">
                {user.is_disabled ? (
                  <span className="text-red-500">Vô hiệu hóa</span>
                ) : (
                  <span className="text-green-500">Hoạt động</span>
                )}
              </td>
              <td className="border p-2">
                <div className="flex justify-center gap-4 items-center">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-hover hover:bg-blue-200 block"
                    onClick={() => openEditUserModal(user)}
                  >
                    <FiEdit />
                  </Button>

                  {user.is_disabled ? (
                    <Button
                      variant="success"
                      onClick={() => openConfirmModal(user, "enable")}
                    >
                      <FaUnlock />
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => openConfirmModal(user, "disable")}
                    >
                      <FaBan />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        total={filteredUsers.length}
        perPage={5}
        currentPage={page}
        onPageChange={setPage}
      />
      {isEditUserModalOpen && (
        <EditUserModal
          isOpen={isEditUserModalOpen}
          user={selectedUser}
          onClose={() => setIsEditUserModalOpen(false)}
          onUpdated={handleUpdated}
        />
      )}

      {isCreateUserModalOpen && (
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
          onCreated={(newUser) => setUsers([...users, newUser])}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          title={
            confirmAction === "disable"
              ? "Xác nhận vô hiệu hóa"
              : "Xác nhận mở khóa"
          }
          message={`Bạn có chắc chắn muốn ${
            confirmAction === "disable" ? "vô hiệu hóa" : "mở khóa"
          } người dùng `}
          object={userToConfirm?.name}
          onConfirm={handleConfirmAction}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
