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
import usePagination from "../../hooks/usePagination";

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleCreated = (newTag) => {
    setTags([newTag, ...tags]);
  };

  const handleUpdated = (updatedTag) => {
    setTags((prev) =>
      prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    );
  };

  const handleConfirmAction = async () => {
    try {
      await TagAPI.delete(confirmTag.id);
      fetchTags();
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

      <EditTagModal
        isOpen={isEditOpen}
        tag={selectedTag}
        onClose={() => closeEditModal(false)}
        onUpdated={handleUpdated}
      />

      <CreateTagModal
        isOpen={isCreateOpen}
        onClose={() => closeCreateModal(false)}
        onCreated={handleCreated}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title={"Xác nhận xoá tag"}
        message={`Bạn có chắc chắn muốn xoá `}
        object={confirmTag?.name}
        onConfirm={handleConfirmAction}
        onCancel={() => closeConfirmModal(false)}
      />
    </div>
  );
};

export default TagManagement;
