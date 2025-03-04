import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFunction, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction();
      if (response.data.data?.length) {
        setData(response.data.data);
      }
    } catch (error) {
      setError(error);
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createItem = async (createFunction, newItem) => {
    try {
      const response = await createFunction(newItem);
      setData((prev) => [response.data.data, ...prev]);
      return response.data.data;
    } catch (error) {
      setError(error);
      console.error("Lỗi khi tạo mục:", error);
    }
  };

  const updateItem = async (updateFunction, id, updatedItem) => {
    try {
      const response = await updateFunction(id, updatedItem);
      setData((prev) =>
        prev.map((item) => (item.id === id ? response.data.data : item))
      );
      return response.data.data;
    } catch (error) {
      setError(error);
      console.error("Lỗi khi cập nhật mục:", error);
    }
  };

  const deleteItem = async (deleteFunction, id) => {
    try {
      await deleteFunction(id);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error);
      console.error("Lỗi khi xóa mục:", error);
    }
  };

  return {
    data,
    setData,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useFetch;
