import { useState, useEffect } from "react";
import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";
import useFetchAPI from "../../hooks/useFetchAPI";
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

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");

  const { data, loading, error } = useFetchAPI(TagAPI.getAll);

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data]);

  const {
    isOpen: isEditOpen,
    selectedItem: selectedTag,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  // Modal create
  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  // Modal confirm
  const {
    isOpen: isConfirmOpen,
    selectedItem: confirmTag,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedTags,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredTags);

  const handleCreated = (newTag) => {
    setTags((prev) => [newTag, ...prev]);
  };

  const handleUpdated = (updatedTag) => {
    setTags((prev) =>
      prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );
  };

  const handleConfirmAction = async () => {
    try {
      await TagAPI.delete(confirmTag.id);
      setTags((prev) => prev.filter((tag) => tag.id !== confirmTag.id));
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

      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div>Lỗi: {error}</div>
      ) : (
        <>
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

          <Pagination
            total={totalItems}
            perPage={itemsPerPage}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
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
          title="Xác nhận xoá tag"
          message="Bạn có chắc chắn muốn xoá "
          object={confirmTag?.name}
          onConfirm={handleConfirmAction}
          onCancel={() => closeConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default TagManagement;
