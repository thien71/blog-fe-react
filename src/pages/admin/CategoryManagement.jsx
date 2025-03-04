import { useEffect, useState } from "react";
import CategoryAPI from "../../apis/endpoints/categories";
import {
  Table,
  Pagination,
  EditCategoryModal,
  CreateCategoryModal,
  ConfirmModal,
  CategoryTagSearchBar,
  CategoryTagTableActions,
} from "../../components";

import useModal from "../../hooks/useModal";
import usePagination from "../../hooks/usePagination";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const {
    isOpen: isEditOpen,
    selectedItem: selectedCategory,
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
    selectedItem: confirmCategory,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedCategories,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredCategories);

  const fetchCategories = async () => {
    try {
      const response = await CategoryAPI.getAll();
      if (response.data.data?.length) {
        setCategories(response.data.data ?? []);
      }
    } catch (error) {
      console.error("Lỗi khi tải categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreated = (newCategory) => {
    setCategories([newCategory, ...categories]);
  };

  const handleUpdated = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const handleConfirmAction = async () => {
    try {
      await CategoryAPI.delete(confirmCategory.id);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi xác nhận hành động", error);
    }
    closeConfirmModal();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4">Quản lý danh mục</h2>

      <CategoryTagSearchBar
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
          {paginatedCategories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                <CategoryTagTableActions
                  category={category}
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

      <EditCategoryModal
        isOpen={isEditOpen}
        category={selectedCategory}
        onClose={() => closeEditModal(false)}
        onUpdated={handleUpdated}
      />

      <CreateCategoryModal
        isOpen={isCreateOpen}
        onClose={() => closeCreateModal(false)}
        onCreated={handleCreated}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title={"Xác nhận xoá danh mục"}
        message={`Bạn có chắc chắn muốn xoá `}
        object={confirmCategory?.name}
        onConfirm={handleConfirmAction}
        onCancel={() => closeConfirmModal(false)}
      />
    </div>
  );
};

export default CategoryManagement;
