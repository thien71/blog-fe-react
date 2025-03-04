import { Button, Input } from "../../../components";
import { useState, useEffect } from "react";
import TagAPI from "../../../apis/endpoints/tags";

const EditTagModal = ({ isOpen, onClose, tag, onUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: tag?.name || "",
  });

  useEffect(() => {
    setFormData({
      name: tag?.name || "",
    });
  }, [tag]);

  if (!isOpen) return null;

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

    try {
      const response = await TagAPI.update(tag.id, data);
      onUpdated(response.data.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật tag:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa tên tag</h2>
        <div className="grid grid-cols-1 gap-6">
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

export default EditTagModal;
