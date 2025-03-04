import { forwardRef } from "react";

const Input = forwardRef(({ label, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-1">{label}</label>}
      <input
        ref={ref}
        className={`border rounded p-2 w-full ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
