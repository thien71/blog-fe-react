import { Modal, CreatePostForm } from "../../../components";

const CreatePostModal = ({ isOpen, onClose, onCreated }) => {
  return (
    <Modal
      // title="Bài viết mới"
      isOpen={isOpen}
      onClose={onClose}
      // onConfirm={handleSubmit}
      size="full"
      className="mx-8"
    >
      <CreatePostForm
      // formData={formData}
      // handleRoleChange={handleRoleChange}
      // handleChange={handleChange}
      // error={error}
      />
    </Modal>
  );
};

export default CreatePostModal;
