import { useEffect, useState, useContext } from "react";
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
import { useAuth } from "../../../contexts/AuthContext";

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
  const [post, setPost] = useState({ id: id || null });

  console.log("Log thử id useParams:", id);
  console.log("Log thử post.id:", post.id);

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    tag: [],
    thumbnail: null,
  });

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchPost = async () => {
      try {
        const response = await PostAPI.getById(id);
        console.log("API Response:", response);
        if (!isMounted) return;

        if (!response.data || !response.data.data) {
          console.error("Không có dữ liệu bài viết!");
          return;
        }

        const postData = response.data?.data;
        console.log("Dữ liệu nhận được:", postData);

        setFormData({
          title: postData.title,
          content: postData.content,
          category_id: postData.category?.id,
          tag: postData.tags.map((tag) => ({ label: tag.name, value: tag.id })),
          thumbnail: null,
        });
        setOriginalData({
          title: postData.title,
          content: postData.content,
          category_id: postData.category?.id,
          tag: postData.tags.map((tag) => ({ label: tag.name, value: tag.id })),
          thumbnail: null,
        });
        setThumbnailPreview(postData.thumbnail);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const isFormChanged = () => {
    return (
      hasEdited && JSON.stringify(formData) !== JSON.stringify(originalData)
    );
  };

  const handleChange = (name, value) => {
    setHasEdited(true);
    setFormData((prev) => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
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
    if (isFormChanged()) {
      openModal();
      return;
    }

    navigate(-1);
  };

  const handleExitWithoutSaving = () => {
    closeModal();
    navigate(-1);
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

      if (post.id) {
        formDataToSend.append("_method", "PUT");
      }

      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category_id", formData.category_id);

      formData.tag.forEach((tag) => {
        formDataToSend.append("tags[]", tag.value);
      });

      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }

      let response;
      // console.log("Form gửi đi:", formDataToSend.toString());
      console.log("FormData gửi đi:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (!post.id) {
        console.log("Không bao giờ vào đây");

        response = await PostAPI.createDraft(formDataToSend);
        if (response.data?.data) {
          setPost({
            id: response.data.data.id,
            // status: response.data.data.status
          });
        }
      } else {
        response = await PostAPI.update(post.id, formDataToSend);
      }

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

      if (post.id) {
        formDataToSend.append("_method", "PUT");
      }

      if (user.role === "admin") {
        formDataToSend.append("status", "published");
      } else {
        formDataToSend.append("status", "pending");
      }

      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category_id", formData.category_id);

      formData.tag.forEach((tag) => {
        formDataToSend.append("tags[]", tag.value);
      });

      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      }

      let response;
      if (!post.id) {
        response = await PostAPI.create(formDataToSend);
      } else {
        response = await PostAPI.update(post.id, formDataToSend);
      }

      if (response.data?.data) {
        if (user.role === "admin") navigate("/admin/posts");
        else navigate("/author/posts");
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
