import { Button, Input, Select } from "../../components";
import { useState } from "react";
import AuthAPI from "../../apis/endpoints/auth";

const roleOptions = [
  { value: "author", label: "Author" },
  { value: "admin", label: "Admin" },
];

const CreateUserModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "author",
  });

  const [error, setError] = useState(""); // Chỉ hiển thị lỗi đầu tiên
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Xóa lỗi khi người dùng nhập lại
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Vui lòng nhập tên.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Vui lòng nhập email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email không hợp lệ.");
      return false;
    }
    if (formData.email.includes(" ")) {
      setError("Email không được chứa khoảng trắng.");
      return false;
    }
    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }
    if (formData.confirmPassword !== formData.password) {
      setError("Mật khẩu không khớp.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await AuthAPI.register(formData);
      onCreated(response.data.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      alert("Có lỗi xảy ra khi tạo người dùng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">Thêm mới người dùng</h2>
        <form onSubmit={handleSubmit} className="grid grid-rows-2 gap-4">
          <div className="col-span-1">
            <label className="block mb-1">Tên</label>
            <Input
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Vai trò</label>
            <Select
              options={roleOptions}
              value={formData.role}
              onChange={handleRoleChange}
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Mật khẩu</label>
            <Input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1">Xác nhận mật khẩu</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </form>
        {error ? (
          <span className="text-red-500 text-sm font-summary min-h-5 block mt-2">
            {error}
          </span>
        ) : (
          <span className="text-red-500 text-sm font-summary min-h-5 block mt-2"></span>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
