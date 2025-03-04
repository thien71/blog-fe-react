import { Button } from "../../../components";
import { FaBan, FaUnlock } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const UserTableActions = ({ user, onEdit, onConfirm }) => {
  return (
    <div className="flex justify-center gap-4 items-center">
      <Button
        variant="outline"
        className="border-blue-500 text-hover hover:bg-blue-200 block"
        onClick={() => onEdit(user)}
      >
        <FiEdit />
      </Button>
      {user.is_disabled ? (
        <Button variant="success" onClick={() => onConfirm(user, "enable")}>
          <FaUnlock />
        </Button>
      ) : (
        <Button variant="danger" onClick={() => onConfirm(user, "disable")}>
          <FaBan />
        </Button>
      )}
    </div>
  );
};

export default UserTableActions;
