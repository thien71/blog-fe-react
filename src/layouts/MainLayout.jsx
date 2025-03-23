import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto px-6 pt-16 pb-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
