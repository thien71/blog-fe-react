import { useEffect, useState } from "react";
import CategoryAPI from "../../apis/endpoints/categories";
import {
  Button,
  Input,
  Table,
  Pagination,
  EditCategoryModal,
  CreateCategoryModal,
  ConfirmModal,
} from "../../components";

import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    setIsCreateModalOpen(true);
  };

  const openConfirmModal = (category) => {
    setSelectedCategory(category);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      await CategoryAPI.delete(selectedCategory.id);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi xác nhận hành động", error);
    }
    setIsConfirmModalOpen(false);
  };

  const handleUpdated = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setSelectedCategory(null);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (page - 1) * 7,
    page * 7
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-bold mb-4">Quản lý danh mục</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm danh mục"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div></div>
        <div></div>
        <Button
          variant="primary"
          size="md"
          onClick={openCreateModal}
          className="gap-2"
        >
          <IoIosAddCircle size={20} />
          <span>Thêm danh mục mới</span>
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
          {paginatedCategories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                <div className="flex justify-center gap-4 items-center">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-hover hover:bg-blue-200 block"
                    onClick={() => openEditModal(category)}
                  >
                    <FiEdit />
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => openConfirmModal(category)}
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
        total={filteredCategories.length}
        perPage={7}
        currentPage={page}
        onPageChange={setPage}
      />
      <EditCategoryModal
        isOpen={isEditModalOpen}
        category={selectedCategory}
        onClose={() => setIsEditModalOpen(false)}
        onUpdated={handleUpdated}
      />

      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(newCategory) => setCategories([newCategory, ...categories])}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={"Xác nhận xoá danh mục"}
        message={`Bạn có chắc chắn muốn xoá `}
        object={selectedCategory?.name}
        onConfirm={handleConfirmAction}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default CategoryManagement;
