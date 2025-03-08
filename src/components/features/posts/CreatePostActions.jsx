import { Button } from "../../../components";

const CreatePostActions = ({
  handleCancel,
  handleSave,
  handleSubmit,
  loading,
  className,
}) => {
  return (
    <div className={`flex justify-end gap-2 pt-4 border-t-2 ${className}`}>
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={loading}
      >
        Huỷ
      </Button>
      <Button variant="primary" onClick={handleSave} disabled={loading}>
        {loading ? `Đang lưu` : "Lưu"}
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? `Đang gửi` : "Gửi"}
      </Button>
    </div>
  );
};

export default CreatePostActions;
