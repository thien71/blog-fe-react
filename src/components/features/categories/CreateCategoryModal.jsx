import { useState } from "react";
import { Modal, CategoryTagForm } from "../..";
import CategoryAPI from "../../../apis/endpoints/categories";
import useForm from "../../../hooks/useForm";

const CreateCategoryModal = ({ isOpen, onClose, onCreated }) => {
  const { formData, handleChange, resetForm, loading, setLoading } = useForm({
    name: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await CategoryAPI.create(formData);
      onCreated(response.data.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo category:", error);
      setErrorMsg("Danh mục đã tồn tại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm mới danh mục"
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

export default CreateCategoryModal;
