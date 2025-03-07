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
          // images_upload_url: "/upload-image", // API upload ảnh (backend Laravel xử lý)
          images_upload_handler: function (blobInfo, success, failure) {
            const formData = new FormData();
            formData.append("file", blobInfo.blob());

            fetch("/api/upload-image", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.url) {
                  success(data.url); // Trả về đường dẫn ảnh sau khi upload thành công
                } else {
                  failure("Upload failed");
                }
              })
              .catch(() => {
                failure("Upload error");
              });
          },
        }}
      />
      <button type="button" onClick={log}>
        Log editor content
      </button>
    </div>
  );
};

export default TinyEditorComponent;
