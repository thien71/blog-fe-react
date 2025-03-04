import { Button, Input } from "../../../components";
import { useState } from "react";
import TagAPI from "../../../apis/endpoints/tags";

const CreateTagModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await TagAPI.create(formData);
      onCreated(response.data.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo tag:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Thêm mới thẻ tag</h2>
        <form onSubmit={handleSubmit} className="grid grid-rows-1 gap-4">
          <div className="col-span-1">
            <label className="block mb-1">Tên</label>
            <Input
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </form>

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

export default CreateTagModal;
