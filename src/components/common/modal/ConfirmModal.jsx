import { Button } from "../../../components";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  object,
  onConfirm,
  onCancel,
  confirmVariant = "danger",
  cancelText = "Hủy",
  confirmText = "Xác nhận",
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${className}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>
          <span>{message}</span>
          {object && <strong className="font-bold"> {object} </strong>}
          <span> không?</span>
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button type="button" variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
