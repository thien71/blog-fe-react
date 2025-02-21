import { Outlet } from "react-router-dom";
// import ProfileSidebar from "@/components/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen">
      <ProfileSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
