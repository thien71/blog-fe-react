import { Modal, EditUserForm } from "../..";
import { useState, useEffect } from "react";
import UserAPI from "../../../apis/endpoints/users";

const EditUserModal = ({ isOpen, onClose, user, onUpdated }) => {
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setAvatarPreview(user?.avatar || "");
  }, [user]);

  if (!isOpen) return null;

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);

    const data = new FormData();
    data.append("_method", "PUT");
    data.append("name", formData.name);
    data.append("email", formData.email);

    if (file) {
      data.append("avatar", file);
    }

    try {
      const response = await UserAPI.update(user.id, data);
      onUpdated(response.data.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa người dùng"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSave}
      size="md"
    >
      <EditUserForm
        avatarPreview={avatarPreview}
        handleAvatarChange={handleAvatarChange}
        formData={formData}
        handleChange={handleChange}
      />
    </Modal>
  );
};

export default EditUserModal;
