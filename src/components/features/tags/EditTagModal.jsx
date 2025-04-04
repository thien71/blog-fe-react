import { Modal, CategoryTagForm } from "../..";
import TagAPI from "../../../apis/endpoints/tags";
import useForm from "../../../hooks/useForm";
import { useEffect, useState } from "react";

const EditTagModal = ({ isOpen, onClose, tag, onUpdated }) => {
  const { formData, handleChange, resetForm, loading, setLoading } = useForm({
    name: tag?.name || "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm({ name: tag?.name });
    }
  }, [isOpen, tag]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("name", formData.name);

    try {
      const response = await TagAPI.update(tag.id, data);
      onUpdated(response.data.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật tag:", error);
      setErrorMsg("Tag đã tồn tại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa tên Tag"
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

export default EditTagModal;
