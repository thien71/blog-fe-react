import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TinyEditorComponent,
  Input,
  CreatePostActions,
  CreatePostSidebar,
  ConfirmModal,
} from "../../..";
import PostAPI from "../../../../apis/endpoints/posts";
import useModal from "../../../../hooks/useModal";
import { useAuth } from "../../../../contexts/AuthContext";

const CreatePostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();

  const [post, setPost] = useState({ id: id || null });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
    tag: [],
    thumbnail: null,
  });
  const [originalData, setOriginalData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [hasEdited, setHasEdited] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const isFirstLoad = useRef(!!id);

  const getRedirectPath = (subPath = "") => {
    const basePath = user.role === "admin" ? "/admin/posts" : "/author/posts";
    return subPath ? `${basePath}/${subPath}` : basePath;
  };

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchPost = async () => {
      try {
        const response = await PostAPI.getById(id);
        if (!isMounted || !response.data?.data) return;

        const postData = response.data.data;
        const formattedData = {
          title: postData.title,
          content: postData.content,
          category_id: postData.category?.id || "",
          tag: postData.tags.map((tag) => ({ label: tag.name, value: tag.id })),
          thumbnail: null,
        };

        setFormData(formattedData);
        setOriginalData(formattedData);
        setThumbnailPreview(postData.thumbnail);
        isFirstLoad.current = false;
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (name, value) => {
    if (isFirstLoad.current) return;

    setFormData((prev) => {
      if (prev[name] === value) return prev;
      setHasEdited(true);
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

  const isFormChanged = () => {
    return (
      hasEdited && JSON.stringify(formData) !== JSON.stringify(originalData)
    );
  };

  const handleCancel = () => {
    if (isFormChanged()) {
      openModal();
    } else {
      navigate(-1);
    }
  };

  const handleExitWithoutSaving = () => {
    closeModal();
    navigate(-1);
  };

  const handleSaveAndExit = async () => {
    setSaveLoading(true);
    try {
      const result = await handleSave();

      if (result) {
        closeModal();
        navigate(getRedirectPath("draft"));
      } else {
        console.error("Lưu thất bại, không điều hướng.");
      }
    } catch (error) {
      console.error("Lỗi khi lưu và thoát:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  // 🔧 Build FormData trước khi gửi API
  const buildFormData = () => {
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

    return formDataToSend;
  };

  const handleSave = async () => {
    setSaveLoading(true);

    try {
      const formDataToSend = buildFormData();
      let response;

      if (!post.id) {
        response = await PostAPI.createDraft(formDataToSend);
        if (response.data?.data) {
          setPost({
            id: response.data.data.id,
          });
        }
      } else {
        response = await PostAPI.update(post.id, formDataToSend);
      }

      if (response.data?.data) {
        setOriginalData({ ...formData });
        setHasEdited(false);
        setThumbnail(null);
        return true;
      } else {
        console.error("Lỗi: API không trả về dữ liệu hợp lệ!");
        return false;
      }
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
      return false;
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const formDataToSend = buildFormData();
      formDataToSend.append(
        "status",
        user.role === "admin" ? "published" : "pending"
      );

      let response;
      if (!post.id) {
        response = await PostAPI.create(formDataToSend);
      } else {
        response = await PostAPI.update(post.id, formDataToSend);
      }

      if (response.data?.data) {
        {
          user.role === "admin"
            ? navigate(getRedirectPath())
            : navigate(getRedirectPath("pending"));
        }
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
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
        <div className="w-[250px] flex flex-col justify-between h-auto">
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
          message="Bài viết chưa được lưu. Bạn muốn lưu lại trước khi rời đi "
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
