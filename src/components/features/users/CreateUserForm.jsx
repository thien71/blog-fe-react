import { Input, Select } from "../../../components";

const roleOptions = [
  { value: "author", label: "Author" },
  { value: "admin", label: "Admin" },
];

const CreateUserForm = ({
  formData,
  handleChange,
  handleRoleChange,
  error,
}) => {
  return (
    <form className="grid grid-rows-2 gap-4">
      <div className="col-span-1">
        <Input
          label="Tên"
          name="name"
          placeholder="Tên"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1">
        <label className="block mb-1">Vai trò</label>
        <Select
          options={roleOptions}
          value={formData.role}
          onChange={handleRoleChange}
        />
      </div>
      <div className="col-span-2">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1">
        <Input
          label="Mật khẩu"
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1">
        <Input
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {error ? (
        <span className="text-red-500 text-sm font-summary min-h-5 block mt-2">
          {error}
        </span>
      ) : (
        <span className="text-red-500 text-sm font-summary min-h-5 block mt-2"></span>
      )}
    </form>
  );
};

export default CreateUserForm;
