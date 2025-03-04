import { CategoryTagForm, Modal } from "../../../components";
import TagAPI from "../../../apis/endpoints/tags";
import useForm from "../../../hooks/useForm";

const CreateTagModal = ({ isOpen, onClose, onCreated }) => {
  const { formData, handleChange, resetForm, loading, setLoading } = useForm({
    name: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await TagAPI.create(formData);
      onCreated(response.data.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo tag:", error);
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
      <CategoryTagForm formData={formData} handleChange={handleChange} />
    </Modal>
  );
};

export default CreateTagModal;
