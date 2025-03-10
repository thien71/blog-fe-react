import { Input, Select, TagSelector } from "../../../../components";
import default_image from "../../../../assets/images/default_image.png";
import CategoryAPI from "../../../../apis/endpoints/categories";
import TagAPI from "../../../../apis/endpoints/tags";
import useFetchAPI from "../../../../hooks/useFetchAPI";

const CreatePostSidebar = ({
  thumbnailPreview,
  handleChange,
  handleFileChange,
  className,
  formData,
}) => {
  const { data: categories, loading: loadingCategories } = useFetchAPI(
    CategoryAPI.getAll
  );
  const { data: tags, loading: loadingTags } = useFetchAPI(TagAPI.getAll);
  return (
    <div className={`${className}`}>
      <Select
        options={[
          { label: "Chọn danh mục", value: "" },
          ...(categories
            ? categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))
            : []),
        ]}
        onChange={(e) => handleChange("category_id", e.target.value)}
        className=""
        disabled={loadingCategories}
      />
      <div className="flex gap-4 justify-between items-center pb-4 border-b-2">
        <img
          src={thumbnailPreview || default_image}
          alt="Thumbnail preview"
          className="w-1/2 object-cover aspect-[5/3] rounded-lg border"
        />

        <Input
          type="file"
          id="thumbnailInput"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <label
          htmlFor="thumbnailInput"
          variant="primary"
          type="button"
          className="text-sm px-2 cursor-pointer bg-blue-500 text-white text-center py-2 rounded-lg 
        hover:bg-blue-600 transition whitespace-nowrap"
        >
          <span>Upload ảnh</span>
        </label>
      </div>

      <TagSelector
        className=""
        tags={
          tags
            ? tags.map((tag) => ({
                label: tag.name,
                value: tag.id,
              }))
            : []
        }
        selectedTags={formData.tag || []}
        onTagsSelected={(tags) => handleChange("tag", tags)}
        disabled={loadingTags}
      />
    </div>
  );
};

export default CreatePostSidebar;
