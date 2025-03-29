import { Modal, CategoryTagForm } from "../..";
import CategoryAPI from "../../../apis/endpoints/categories";
import useForm from "../../../hooks/useForm";
import { useEffect, useState } from "react";

const EditCategoryModal = ({ isOpen, onClose, category, onUpdated }) => {
  const { formData, handleChange, resetForm, loading, setLoading } = useForm({
    name: category?.name || "",
  });

  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg("Danh mục đã tồn tại");
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
      <CategoryTagForm
        formData={formData}
        handleChange={handleChange}
        onEnter={handleSubmit}
        errorMsg={errorMsg}
      />
    </Modal>
  );
};

export default EditCategoryModal;
