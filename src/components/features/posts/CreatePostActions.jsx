import { Button } from "../../../components";

const CreatePostActions = ({
  handleCancel,
  handleSave,
  handleSubmit,
  saveLoading,
  submitLoading,
  className,
}) => {
  return (
    <div className={`flex justify-end gap-2 pt-4 border-t-2 ${className}`}>
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={saveLoading || submitLoading}
      >
        Thoát
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleSave}
        disabled={saveLoading || submitLoading}
      >
        {saveLoading ? `⌛` : "Lưu"}
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleSubmit}
        disabled={saveLoading || submitLoading}
      >
        {submitLoading ? `⌛` : "Gửi"}
      </Button>
    </div>
  );
};

export default CreatePostActions;
