import { IoIosAddCircle } from "react-icons/io";
import { Button, Input } from "../..";

const CategoryTagSearchBar = ({ search, onSearchChange, onAddNew }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Tìm kiếm danh mục"
        value={search}
        onChange={onSearchChange}
      />
      <div></div>
      <div></div>
      <Button variant="primary" size="md" onClick={onAddNew} className="gap-2">
        <IoIosAddCircle size={20} />
        <span>Thêm danh mục mới</span>
      </Button>
    </div>
  );
};

export default CategoryTagSearchBar;
