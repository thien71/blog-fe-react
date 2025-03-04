import { Input, Select, Button } from "../../../components";
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

const UserSearchbar = ({
  search,
  onSearchChange,
  filter,
  setFilter,
  statusFilter,
  setStatusFilter,
  onAddNew,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Tìm kiếm người dùng..."
        value={search}
        onChange={onSearchChange}
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
      <Button variant="primary" size="md" onClick={onAddNew} className="gap-2">
        <IoIosAddCircle size={20} />
        <span>Tạo người dùng mới</span>
      </Button>
    </div>
  );
};

export default UserSearchbar;
