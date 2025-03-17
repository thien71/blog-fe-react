import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PostAPI from "../../apis/endpoints/posts";

const TinyEditorComponent = ({ value, onChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  const log = () => {
    if (editorRef.current) {
      console.log("Log", editorRef.current.getContent());
    }
  };

  const handleImageUpload = async (blobInfo) => {
    try {
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("images[0]", file);

      const data = await PostAPI.uploadImage(formData);
      console.log("data", data.data.urls);

      if (data.data.urls && data.data.urls.length > 0) {
        return data.data.urls[0];
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Upload error");
    }
  };

  // const handleImageUpload = (blobInfo) => {
  //   return new Promise((resolve) => {
  //     const file = blobInfo.blob();
  //     const tempUrl = URL.createObjectURL(file);
  //     resolve(tempUrl);
  //   });
  // };

  const extractImagesFromContent = () => {
    if (!editorRef.current) return [];

    let content = editorRef.current.getContent();
    const imgTags = content.match(/<img[^>]+src="([^">]+)"/g) || [];

    return imgTags.map((tag) => tag.match(/src="([^">]+)"/)?.[1]);
  };

  const handleCheckImages = () => {
    const images = extractImagesFromContent();
    console.log("🖼 Danh sách ảnh Blob:", images);
  };

  return (
    <div>
      <Editor
        apiKey="03mgt0egbwsii4mgy2o9e3qs4pr2nnnlupfd7ona5ev80uuw"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: 500,
          menubar: false,
          resize: false,
          elementpath: false,
          branding: false,
          statusbar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            // "help",
            // "wordcount",
          ],
          toolbar:
            "undo redo styles fontfamily fontsize bold italic underline forecolor backcolor table image media link align bullist numlist outdent indent removeformat help",
          content_style:
            "body { font-family:Merriweather,Arial,serif; font-size:16px }",
          images_upload_handler: handleImageUpload,
          setup: (editor) => {
            editor.on("init", () => {
              const style = document.createElement("style");
              style.innerHTML = `
                .tox-tbtn--select[data-mce-name="styles"] {
                  width: 90px !important;
                }
                .tox-tbtn--select[data-mce-name="fontfamily"] {
                  width: 90px !important;
                }
                .tox-tbtn--select[data-mce-name="fontsize"] {
                  width: 60px !important;
                }
              `;
              document.head.appendChild(style);
            });
          },
        }}
      />
      <button type="button" onClick={log}>
        Log editor content
      </button>
      <button type="button" onClick={handleCheckImages}>
        📸 Kiểm tra ảnh
      </button>
    </div>
  );
};

export default TinyEditorComponent;
