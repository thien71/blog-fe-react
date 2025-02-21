import { Outlet } from "react-router-dom";
// import Sidebar from "@/components/AdminSidebar";
// import AdminHeader from "@/components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <AdminHeader /> */}
        <main className="flex-1 p-4 overflow-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
