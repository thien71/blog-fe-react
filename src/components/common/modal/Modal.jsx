import { Button } from "../../../components";
import { useState } from "react";

const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Lưu",
  cancelText = "Huỷ",
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (typeof onConfirm !== "function") return;
    setLoading(true);
    try {
      const result = onConfirm();
      if (result instanceof Promise) {
        await result;
      }
      onClose();
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleConfirm} disabled={loading}>
            {loading ? `Đang ${confirmText}...` : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
