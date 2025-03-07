import { useState } from "react";
import {
  TinyEditorComponent,
  Input,
  Select,
  Button,
  TagSelector,
} from "../../../components";
import default_image from "../../../assets/images/default_image.png";

const CreatePostForm = ({ handleCancel, handleSave, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    tag: "",
    thumbnail: null,
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setThumbnail(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmit = () => {
    console.log("Form data: ", formData);
    handleSubmit(formData);
  };
  return (
    <form className="relative flex flex-col gap-4 max-h-[calc(100vh-200px)] font-title text-title scrollbar-hidden">
      <div className="border-b-4 sticky top-0 z-5">
        <Input
          name="title"
          placeholder="Tiêu đề"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="border-none placeholder:font-bold outline-none px-0 text-2xl placeholder:italic"
        />
      </div>
      <div className="flex justify-between gap-2">
        <div className="w-[900px] h-[500px] border-r-4 pr-2">
          <div>
            <TinyEditorComponent
              value={formData.content}
              onChange={(value) => handleChange("content", value)}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between h-auto">
          <div className="grid grid-cols-2 h-fit gap-4">
            <Select
              options={[
                { label: "Chọn danh mục", value: "" },
                { label: "ReactJS", value: "1" },
              ]}
              onChange={(e) => handleChange("category_id", e.target.value)}
            />
            {/* <Select
              options={[
                { label: "Chọn tag", value: "" },
                { label: "JavaScript", value: "2" },
              ]}
              onChange={(e) => handleChange("tag", e.target.value)}
            /> */}
            <TagSelector
              className="col-span-2"
              tags={[
                { label: "JavaScript", value: "2" },
                { label: "ReactJS", value: "3" },
                { label: "Laravel", value: "4" },
              ]}
              onTagsSelected={(tags) => console.log("Tags đã chọn:", tags)}
            />

            <div className="w-full col-span-1 flex flex-col gap-4">
              {/* {thumbnailPreview && ( */}
              <img
                src={thumbnailPreview || default_image}
                alt="Thumbnail preview"
                className="w-full object-cover aspect-[5/3] rounded-lg border"
              />
              {/* )} */}

              <Input
                type="file"
                id="thumbnailInput"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <label
                htmlFor="thumbnailInput"
                className="cursor-pointer bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Chọn ảnh
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              Huỷ
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading ? `Đang lưu` : "Lưu"}
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? `Đang gửi` : "Gửi"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
