import { useEffect, useState } from "react";
import { IoIosAddCircleOutline, IoMdClose } from "react-icons/io";
import { Button, Modal } from "../../common";
import { FaTags } from "react-icons/fa";
import useModal from "../../../hooks/useModal";

const TagSelector = ({
  tags,
  onTagsSelected,
  className,
  selectedTags = [],
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [localSelectedTags, setLocalSelectedTags] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   if (isOpen) {
  //     console.log("Mở modal, selectedTags hiện tại:", selectedTags);
  //     setLocalSelectedTags(selectedTags);
  //   }
  // }, [isOpen, selectedTags]);

  useEffect(() => {
    if (isOpen) {
      console.log("Mở modal, selectedTags hiện tại:", selectedTags);
      setLocalSelectedTags((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(selectedTags)) {
          return selectedTags;
        }
        return prev;
      });
    }
  }, [isOpen, selectedTags]);

  const handleTagToggle = (tag) => {
    setLocalSelectedTags((prev) => {
      const isSelected = prev.some((t) => t.value === tag.value);
      const newTags = isSelected
        ? prev.filter((t) => t.value !== tag.value)
        : [...prev, tag];

      console.log("🟢 Tags đã chọn sau khi click:", newTags);
      onTagsSelected(newTags);
      return newTags;
    });
  };

  const handleClearSelection = (e) => {
    e.preventDefault();
    setLocalSelectedTags([]);
  };
  const handleConfirmSelection = () => {
    onTagsSelected(localSelectedTags);
    closeModal();
  };

  return (
    <div className={className}>
      <Button
        type="button"
        onClick={openModal}
        variant="outline"
        className="group flex gap-2 hover:outline outline-1 outline-blue-300"
      >
        <FaTags size={20} className="transition-all duration-300" />
        <span>Gắn tag</span>
      </Button>

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

      <Modal
        title="Chọn Tag"
        isOpen={isOpen}
        onClose={closeModal}
        cancelText="Đóng"
        confirmText="Xác nhận"
        onConfirm={handleConfirmSelection}
        className={"relative"}
      >
        <input
          type="text"
          placeholder="Tìm kiếm tag..."
          className="w-full p-2 border rounded-md mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-40">
          {tags
            .filter((tag) =>
              tag.label.toLowerCase().includes(search.toLowerCase())
            )
            .map((tag) => (
              <label
                key={tag.value}
                className="flex items-center gap-2 p-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={tag.value}
                  checked={localSelectedTags.some((t) => t.value === tag.value)}
                  onChange={() => handleTagToggle(tag)}
                />
                {tag.label}
              </label>
            ))}
        </div>

        <div className="absolute top-2 right-6  gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={handleClearSelection}>
            Bỏ chọn tất cả
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TagSelector;
