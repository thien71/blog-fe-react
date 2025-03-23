import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar, PostsSidebar } from "../components";

const PostDetailLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto px-6 pt-16 pb-6 flex gap-4">
        <Sidebar />
        <section className="max-w-screen-lg w-9/12 ml-24 mr-12">
          <Outlet />
        </section>
        <PostsSidebar />
      </main>
      <Footer className={"ml-[200px]"} />
    </div>
  );
};

export default PostDetailLayout;
