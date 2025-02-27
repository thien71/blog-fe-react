import { Button } from "../../components";

const Pagination = ({ total, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className="flex justify-end gap-2 mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "primary" : "outline"}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
