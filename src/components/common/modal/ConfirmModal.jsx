import { Button } from "../../../components";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  object,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>
          <span>{message}</span>
          <strong className="font-bold">{object} </strong>
          <span> không?</span>
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
