import { useState, useEffect, useCallback } from "react";

/**
 * useFetchAPI - Custom hook để gọi API GET
 * @param {Function} apiMethod - Hàm gọi API từ UserAPI, PostAPI, TagAPI, CategoryAPI,...
 * @param {Array} params - Các tham số truyền vào hàm API (nếu có)
 * @returns {Object} - { data, loading, error, refetch }
 */
const useFetchAPI = (apiMethod, params = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiMethod(...params);
      setData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [apiMethod, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchAPI;
