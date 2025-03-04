import { useEffect, useRef } from "react";
import { Input } from "../../../components";

const CategoryForm = ({ formData, handleChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
