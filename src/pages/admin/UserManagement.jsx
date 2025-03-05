import { useEffect, useState } from "react";
import UserAPI from "../../apis/endpoints/users";
import {
  Table,
  Pagination,
  EditUserModal,
  CreateUserModal,
  ConfirmModal,
  UserSearchBar,
  UserTableActions,
  Avatar,
} from "../../components";

import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [users, setUsers] = useState([]);

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

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = filter ? user.role === filter : true;
    const matchesStatus =
      statusFilter === "Active"
        ? !user.is_disabled
        : statusFilter === "Disabled"
        ? user.is_disabled
        : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedUsers,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredUsers, 6);

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

  const handleCreated = (newUser) => setUsers([newUser, ...users]);

  const handleUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleConfirmAction = async () => {
    if (!userToConfirm) return;
    try {
      if (userToConfirm.is_disabled) {
        await UserAPI.restore(userToConfirm.id);
      } else {
        await UserAPI.delete(userToConfirm.id);
      }
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi xử lý hành động xác nhận", error);
    }
    closeConfirmModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>

      <UserSearchBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        filter={filter}
        setFilter={setFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddNew={openCreateModal}
      />

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
                <Avatar src={user.avatar} alt={user.name} />
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
                <UserTableActions
                  user={user}
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

export default UserManagement;
