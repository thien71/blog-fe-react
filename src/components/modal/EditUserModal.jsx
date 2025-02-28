import { Button, Input } from "..";
import { useState, useEffect } from "react";
import UserAPI from "../../apis/endpoints/users";
import defaultAvatar from "../../assets/images/default_avatar.jpg";

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
      alert("Có lỗi xảy ra khi cập nhật hồ sơ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Avatar</label>
            <div className="flex flex-col items-center gap-2">
              <img
                src={avatarPreview || defaultAvatar}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full border-black mb-2 object-cover block"
              />
              <div className="flex flex-col items-center gap-2">
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatarInput"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                  Chọn ảnh
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="block mb-1">Tên</label>
              <Input
                name="name"
                placeholder="Tên"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <Input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
