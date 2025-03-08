import { Button } from "../../../components";
import { useState } from "react";

const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  onConfirm,
  size = "sm",
  confirmText = "Lưu",
  cancelText = "Huỷ",
  className,
  hideConfirmButton = false,
  // type = "submit",
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
      if (result === true) {
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: "w-[400px]",
    md: "w-[600px]",
    lg: "w-[800px]",
    xl: "w-[1000px]",
    full: "w-full",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg ${sizeClasses[size]} ${className}`}
      >
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          {!hideConfirmButton && (
            <Button
              // type={type}
              variant="primary"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? `Đang ${confirmText}...` : confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
