import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  Button,
  Input,
  Select,
  Table,
  Pagination,
  UserModal,
} from "../../components";
import UserAPI from "../../apis/endpoints/users";

const filters = [
  { value: "", label: "Tất cả" },
  { value: "admin", label: "Admin" },
  { value: "author", label: "Author" },
];

const status = [
  { value: "", label: "Tất cả" },
  { value: "Active", label: "Hoạt động" },
  { value: "Disabled", label: "Vô hiệu hóa" },
];

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await UserAPI.getAll();
        if (response.data.data?.length) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải users", error);
      }
    })();
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

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
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
                  src={user.avatar || "https://i.pravatar.cc/40"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border mx-auto"
                />
              </td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 text-center">{user.role}</td>
              <td className="border p-2 text-center">
                {user.deleted_at ? (
                  <span className="text-red-500">Vô hiệu hóa</span>
                ) : (
                  <span className="text-green-500">Hoạt động</span>
                )}
              </td>
              <td className="border p-2 flex justify-center gap-4">
                <Button
                  variant="outline"
                  className={"border-blue-500 text-hover hover:bg-blue-200"}
                  onClick={() => openModal(user)}
                >
                  <FiEdit />
                </Button>
                <Button variant="danger">
                  <FiTrash2 />
                </Button>
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
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
