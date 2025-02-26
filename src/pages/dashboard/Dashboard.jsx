import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AuthAPI from "../../apis/endpoints/auth";

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setRole(userData.role);
    }
  }, [navigate]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {role === "admin" && <AdminSection />}
      {role === "author" && <AuthorSection />}
    </div>
  );
};

const AdminSection = () => (
  <p>Quản lý người dùng, duyệt bài viết, cấu hình...</p>
);
const AuthorSection = () => <p>Quản lý bài viết, thống kê lượt xem...</p>;

export default Dashboard;
