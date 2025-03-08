import { useEffect, useState } from "react";
import {
  TinyEditorComponent,
  Input,
  CreatePostActions,
  CreatePostSidebar,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../../apis/endpoints/users";
import useFetchAPI from "../../../hooks/useFetchAPI";
import PostAPI from "../../../apis/endpoints/posts";

const CreatePostForm = () => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    tag: [],
    thumbnail: null,
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setThumbnail(selectedFile);
      handleChange("thumbnail", selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSave = () => {};
  const handleSubmit = async () => {
    setLoading(true);
    console.log("Xem formdata trước try catch", formData);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category_id", formData.category_id);

      formData.tag.forEach((tag) => {
        formDataToSend.append("tags[]", tag.value);
      });

      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }

      const response = await PostAPI.create(formDataToSend);

      if (response.status === 201) {
        navigate("/admin/posts");
      } else {
        throw new Error("Đã có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
    } finally {
      setLoading(false);
    }
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
        <div className="flex-1 h-[500px] border-r-4 pr-2">
          <TinyEditorComponent
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
          />
        </div>
        <div className="w-[300px] flex flex-col justify-between h-auto">
          <CreatePostSidebar
            thumbnailPreview={thumbnailPreview}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            formData={formData}
            className="flex flex-col gap-4"
          />

          <CreatePostActions
            handleCancel={handleCancel}
            handleSave={handleSave}
            handleSubmit={handleSubmit}
            loading={loading}
            className=""
          />
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
