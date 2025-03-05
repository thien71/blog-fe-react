import { Avatar, Input } from "../..";

const EditUserForm = ({
  avatarPreview,
  handleAvatarChange,
  formData,
  handleChange,
}) => {
  return (
    <form className="grid grid-cols-2 gap-6">
      <div>
        <label className="block mb-2">Avatar</label>
        <div className="flex flex-col items-center gap-2">
          <Avatar
            src={avatarPreview}
            alt={"Avatar preview"}
            className="w-20 h-20 border-black mb-2 object-cover block"
          />
          <div className="flex flex-col items-center gap-2">
            <Input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <label
              htmlFor="avatarInput"
              className="cursor-pointer bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
            >
              Chọn ảnh
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            label="Tên"
            name="name"
            placeholder="Tên"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            label="Email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
