import { useState } from "react";

const usePagination = (data, itemsPerPage = 7) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    setCurrentPage,
    paginatedData,
    totalItems: data.length,
    itemsPerPage,
  };
};

export default usePagination;
