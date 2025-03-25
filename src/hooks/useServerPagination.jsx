import { useState, useEffect, useCallback } from "react";

const useServerPagination = (fetchDataFn, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (page = currentPage) => {
      setLoading(true);
      try {
        const response = await fetchDataFn(page);

        if (response?.data) {
          setData(response.data);
          setMeta(response.meta);
          setCurrentPage(response.meta.current_page);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phân trang:", error);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, fetchDataFn]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  return {
    data,
    meta,
    currentPage,
    setCurrentPage,
    loading,
    fetchData,
  };
};

export default useServerPagination;
