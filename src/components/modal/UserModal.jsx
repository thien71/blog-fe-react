import { Button, Input, Select } from "../../components";

const UserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h2>
        <div className="space-y-4">
          <Input placeholder="Tên" defaultValue={user?.name} />
          <Input placeholder="Email" defaultValue={user?.email} />
          <Input placeholder="Avatar URL" defaultValue={user?.avatar} />
          <Select
            options={[
              { value: "admin", label: "Admin" },
              { value: "author", label: "Author" },
            ]}
            value={user?.role}
            onChange={() => {}}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary">Lưu</Button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
