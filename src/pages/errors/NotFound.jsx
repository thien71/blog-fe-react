import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-700">404 - Not Found</h1>
      <p className="text-gray-500 mt-2">Trang bạn tìm không tồn tại.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
