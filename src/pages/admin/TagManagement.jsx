import { useEffect, useState } from "react";
import TagAPI from "../../apis/endpoints/tags";
import {
  Button,
  Input,
  Table,
  Pagination,
  EditTagModal,
  CreateTagModal,
  ConfirmModal,
} from "../../components";

import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isCreateTagModalOpen, setIsCreateTagModalOpen] = useState(false);
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const fetchTags = async () => {
    try {
      const response = await TagAPI.getAll();
      if (response.data.data?.length) {
        setTags(response.data.data ?? []);
      }
    } catch (error) {
      console.error("Lỗi khi tải tags", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const openEditTagModal = (tag) => {
    setSelectedTag(tag);
    setIsEditTagModalOpen(true);
  };

  const openCreateTagModal = () => {
    setSelectedTag(null);
    setIsCreateTagModalOpen(true);
  };

  const openConfirmModal = (tag) => {
    setSelectedTag(tag);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      await TagAPI.delete(selectedTag.id);
      setSelectedTag(null);

      fetchTags();
    } catch (error) {
      console.error("Lỗi khi xác nhận hành động", error);
    }

    setIsConfirmModalOpen(false);
  };

  const handleUpdated = (updatedTag) => {
    setTags((prev) =>
      prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );
    setSelectedTag(null);
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedTags = filteredTags.slice((page - 1) * 7, page * 7);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4">Quản lý thẻ tag</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm tag"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div></div>
        <div></div>
        <Button
          variant="primary"
          size="md"
          onClick={openCreateTagModal}
          className="gap-2"
        >
          <IoIosAddCircle size={20} />
          <span>Thêm tag mới</span>
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="border p-2">Id</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTags.map((tag) => (
            <tr key={tag.id} className="text-center">
              <td className="border p-2">{tag.id}</td>
              <td className="border p-2">{tag.name}</td>
              <td className="border p-2">
                <div className="flex justify-center gap-4 items-center">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-hover hover:bg-blue-200 block"
                    onClick={() => openEditTagModal(tag)}
                  >
                    <FiEdit />
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => openConfirmModal(tag)}
                  >
                    <MdDeleteForever />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        total={filteredTags.length}
        perPage={7}
        currentPage={page}
        onPageChange={setPage}
      />
      <EditTagModal
        isOpen={isEditTagModalOpen}
        tag={selectedTag}
        onClose={() => setIsEditTagModalOpen(false)}
        onUpdated={handleUpdated}
      />

      <CreateTagModal
        isOpen={isCreateTagModalOpen}
        onClose={() => setIsCreateTagModalOpen(false)}
        onCreated={(newTag) => setTags([newTag, ...tags])}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={"Xác nhận xoá tag"}
        message={`Bạn có chắc chắn muốn xoá `}
        object={selectedTag?.name}
        onConfirm={handleConfirmAction}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};
export default TagManagement;
