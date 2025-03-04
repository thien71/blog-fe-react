import { Modal, CategoryForm } from "../../../components";
import CategoryAPI from "../../../apis/endpoints/categories";
import useForm from "../../../hooks/useForm";
import { useEffect } from "react";

const EditCategoryModal = ({ isOpen, onClose, category, onUpdated }) => {
  const { formData, handleChange, resetForm, loading, setLoading } = useForm({
    name: category?.name || "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({ name: category?.name });
    }
  }, [isOpen, category]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("name", formData.name);

    try {
      const response = await CategoryAPI.update(category.id, data);
      onUpdated(response.data.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa tên Category"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
    >
      <CategoryForm formData={formData} handleChange={handleChange} />
    </Modal>
  );
};

export default EditCategoryModal;
