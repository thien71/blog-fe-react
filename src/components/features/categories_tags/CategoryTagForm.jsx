import { useEffect, useRef } from "react";
import { Input } from "../..";

const CategoryTagForm = ({ formData, handleChange, onEnter, errorMsg }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={handleKeyDown}
      className="grid grid-cols-1 gap-6"
    >
      <div className="flex flex-col gap-2">
        <div>
          <Input
            label="Tên"
            name="name"
            placeholder="Tên"
            value={formData.name}
            onChange={handleChange}
            ref={inputRef}
          />
          {errorMsg ? (
            <p className="font-summary text-sm mt-2 h-5 text-red-500">
              {errorMsg}
            </p>
          ) : (
            <p className="font-summary text-sm mt-2 h-5 text-red-500"></p>
          )}
        </div>
      </div>
    </form>
  );
};

export default CategoryTagForm;
