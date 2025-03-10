import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

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

  const handleImageUpload = (blobInfo) => {
    return new Promise((resolve) => {
      const file = blobInfo.blob();
      const tempUrl = URL.createObjectURL(file);
      resolve(tempUrl);
    });
  };

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
            "undo redo blocks fontselect fontsizeselect bold italic underline forecolor image media link alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help",
          content_style:
            "body { font-family:Merriweather,Arial,serif; font-size:16px }",
          images_upload_handler: handleImageUpload,
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
