import { useState } from "react";
import { CategoryTagForm, Modal } from "../..";
import TagAPI from "../../../apis/endpoints/tags";
import useForm from "../../../hooks/useForm";

const CreateTagModal = ({ isOpen, onClose, onCreated }) => {
  const { formData, handleChange, resetForm, loading, setLoading } = useForm({
    name: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await TagAPI.create(formData);
      onCreated(response.data.data);
      resetForm();
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMsg("Tag đã tồn tại");
      } else {
        console.error("Lỗi khi tạo tag:", error);
        setErrorMsg("Tag đã tồn tại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm mới thẻ tag"
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

export default CreateTagModal;
