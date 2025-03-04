import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "../..";

const CategoryTagTableActions = ({ category, onEdit, onDelete }) => {
  return (
    <div className="flex justify-center gap-4 items-center">
      <Button
        variant="outline"
        className="border-blue-500 text-hover hover:bg-blue-200 block"
        onClick={() => onEdit(category)}
      >
        <FiEdit />
      </Button>

      <Button variant="danger" onClick={() => onDelete(category)}>
        <MdDeleteForever />
      </Button>
    </div>
  );
};

export default CategoryTagTableActions;
