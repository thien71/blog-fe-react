import { useState } from "react";

const TagSelector = ({ tags, onTagsSelected, className }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    onTagsSelected(selectedTags);
    setShowModal(false);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Gắn tag
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md w-1/3">
            <h2 className="text-lg font-bold mb-4">Chọn Tag</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {tags.map((tag) => (
                <label key={tag.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tag.value}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  {tag.label}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-4 flex-wrap">
        {selectedTags.map((tag) => (
          <span
            key={tag.value}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
