import { useEffect, useState } from "react";
import {
  TinyEditorComponent,
  Input,
  CreatePostActions,
  CreatePostSidebar,
  ConfirmModal,
} from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import PostAPI from "../../../apis/endpoints/posts";
import useModal from "../../../hooks/useModal";

const CreatePostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [originalData, setOriginalData] = useState(null);
  const { isOpen, selectedItem, openModal, closeModal } = useModal();
  const [hasEdited, setHasEdited] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    tag: [],
    thumbnail: null,
  });

  useEffect(() => {
    if (id) {
      // const fetchPost = async () => {
      //   try {
      //     const response = await PostAPI.getById(id);
      //     const postData = response.data?.data;
      //     const initialFormData = {
      //       title: postData.title,
      //       content: postData.content,
      //       category_id: postData.category.id,
      //       tag: postData.tags.map((tag) => ({
      //         label: tag,
      //       })),
      //       thumbnail: null,
      //     };
      //     setFormData(initialFormData);
      //     setOriginalData(initialFormData); // Lưu trạng thái ban đầu
      //     setThumbnailPreview(postData.thumbnail);
      //   } catch (error) {
      //     console.error("Lỗi khi lấy bài viết:", error);
      //   }
      // };
      // fetchPost();
    } else {
      setOriginalData({
        title: "",
        content: "",
        category_id: "",
        tag: [],
        thumbnail: null,
      });
    }
  }, [id]);

  const isFormChanged = () => {
    if (!hasEdited) return false;
    return (
      JSON.stringify(formData) !== JSON.stringify(originalData) ||
      thumbnail !== null
    );
  };

  const handleChange = (name, value) => {
    setHasEdited(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setHasEdited(true);
      setThumbnail(selectedFile);
      handleChange("thumbnail", selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCancel = async () => {
    if (originalData === null) {
      try {
        await PostAPI.forceDelete(id);
        navigate(-1);
      } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
      }
      return;
    }

    if (
      !hasEdited &&
      originalData &&
      !originalData.title &&
      !originalData.content
    ) {
      try {
        await PostAPI.forceDelete(id);
        navigate(-1);
      } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
      }
      return;
    }

    if (isFormChanged()) {
      openModal();
      return;
    }

    navigate(-1);
  };

  const handleExitWithoutSaving = () => {
    closeModal();
    if (originalData && !originalData.title && !originalData.content) {
      PostAPI.forceDelete(id)
        .catch((error) => console.error("Lỗi khi xóa bài viết:", error))
        .finally(() => navigate(-1));
    } else {
      navigate(-1);
    }
  };

  const handleSaveAndExit = async () => {
    await handleSave();
    closeModal();
    navigate(-1);
  };

  const handleSave = async () => {
    setSaveLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("_method", "PUT");
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category_id", formData.category_id);

      formData.tag.forEach((tag) => {
        formDataToSend.append("tags[]", tag.value);
      });

      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }

      const response = await PostAPI.updateDraft(id, formDataToSend);

      if (response.data?.data) {
        const savedData = { ...formData };
        setOriginalData(savedData);
        setHasEdited(false);
        setThumbnail(null);
      } else {
        throw new Error("Đã có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("_method", "PUT");
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category_id", formData.category_id);

      formData.tag.forEach((tag) => {
        formDataToSend.append("tags[]", tag.value);
      });

      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }

      const response = await PostAPI.submitPost(id, formDataToSend);

      if (response.data?.data) {
        navigate("/admin/posts");
      } else {
        throw new Error("Đã có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
    } finally {
      setSubmitLoading(false);
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
            saveLoading={saveLoading}
            submitLoading={submitLoading}
            className=""
          />
        </div>
      </div>

      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="Bạn có chắc muốn thoát"
          message="Bài viết chưa được lưu. Bạn muốn lưu lại trước khi rời đi?"
          onCancel={handleExitWithoutSaving}
          onConfirm={handleSaveAndExit}
          confirmVariant="success"
          confirmText="Lưu & Thoát"
          cancelText="Thoát"
        />
      )}
    </form>
  );
};

export default CreatePostForm;
