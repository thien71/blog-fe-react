import { useEffect, useState } from "react";
import TagAPI from "../../apis/endpoints/tags";
import {
  Table,
  Pagination,
  EditTagModal,
  CreateTagModal,
  ConfirmModal,
  CategoryTagSearchBar,
  CategoryTagTableActions,
} from "../../components";
import useModal from "../../hooks/useModal";

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isOpen: isEditOpen,
    selectedItem: selectedTag,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const {
    isOpen: isConfirmOpen,
    selectedItem: confirmTag,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const fetchTags = async (page = 1) => {
    try {
      const response = await TagAPI.getAll({ page });
      if (response.data.data?.length) {
        setTags(response.data.data);
        setMeta(response.data.meta);
        setCurrentPage(response.data.meta.current_page);
      }
    } catch (error) {
      console.error("Lỗi khi tải tags", error);
    }
  };

  useEffect(() => {
    fetchTags(1);
  }, []);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page) => {
    fetchTags(page);
  };

  const handleCreated = (newTag) => {
    fetchTags(currentPage);
  };

  const handleUpdated = (updatedTag) => {
    setTags((prev) =>
      prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );
  };

  const handleConfirmAction = async () => {
    try {
      await TagAPI.delete(confirmTag.id);
      fetchTags(currentPage);
    } catch (error) {
      console.error("Lỗi khi xác nhận hành động", error);
    }
    closeConfirmModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4">Quản lý thẻ tag</h2>

      <CategoryTagSearchBar
        type="tag"
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onAddNew={openCreateModal}
      />

      <Table>
        <thead>
          <tr>
            <th className="border p-2">Id</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredTags.map((tag) => (
            <tr key={tag.id} className="text-center">
              <td className="border p-2">{tag.id}</td>
              <td className="border p-2">{tag.name}</td>
              <td className="border p-2">
                <CategoryTagTableActions
                  data={tag}
                  onEdit={openEditModal}
                  onDelete={openConfirmModal}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {meta && (
        <Pagination
          total={meta.total}
          perPage={meta.per_page}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      {isEditOpen && (
        <EditTagModal
          isOpen={isEditOpen}
          tag={selectedTag}
          onClose={() => closeEditModal(false)}
          onUpdated={handleUpdated}
        />
      )}

      {isCreateOpen && (
        <CreateTagModal
          isOpen={isCreateOpen}
          onClose={() => closeCreateModal(false)}
          onCreated={handleCreated}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          title={"Xác nhận xoá tag"}
          message={`Bạn có chắc chắn muốn xoá `}
          object={confirmTag?.name}
          onConfirm={handleConfirmAction}
          onCancel={() => closeConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default TagManagement;
