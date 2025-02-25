import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "../components";
import PostsSidebar from "../components/sidebar/PostsSidebar";

const PostDetailLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto p-6 flex gap-4">
        <Sidebar />
        <section className="max-w-screen-md w-8/12 px-4">
          <Outlet />
        </section>
        <PostsSidebar />
      </main>
      <Footer />
    </div>
  );
};

export default PostDetailLayout;
