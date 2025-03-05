import { Modal, CreateUserForm } from "../..";
import { useState } from "react";
import AuthAPI from "../../../apis/endpoints/auth";

const CreateUserModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "author",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
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

  const handleSubmit = async () => {
    if (!validateForm()) return false;

    setLoading(true);

    try {
      const response = await AuthAPI.register(formData);
      onCreated(response.data.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm mới người dùng"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      size="md"
    >
      <CreateUserForm
        formData={formData}
        handleRoleChange={handleRoleChange}
        handleChange={handleChange}
        error={error}
      />
    </Modal>
  );
};

export default CreateUserModal;
