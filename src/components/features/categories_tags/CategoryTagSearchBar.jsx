import { IoIosAddCircle } from "react-icons/io";
import { Button, Input } from "../..";

const CategoryTagSearchBar = ({
  search,
  onSearchChange,
  onAddNew,
  type = "category",
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Input
        placeholder={`Tìm kiếm ${type === "category" ? "danh mục" : "thẻ tag"}`}
        value={search}
        onChange={onSearchChange}
      />
      <div></div>
      <div></div>
      <Button variant="primary" size="md" onClick={onAddNew} className="gap-2">
        <IoIosAddCircle size={20} />
        <span>{`Thêm  ${type === "category" ? "danh mục" : "tag"} mới`}</span>
      </Button>
    </div>
  );
};

export default CategoryTagSearchBar;
