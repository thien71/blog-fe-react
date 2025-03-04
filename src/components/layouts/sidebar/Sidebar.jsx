import { PostsList, SocialLinks } from "../../../components";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 h-[calc(100vh-3rem)] bg-white w-[200px] top-12 pl-4 pr-2 py-0 border-r-2 overflow-y-auto scrollbar-hidden">
      <SocialLinks />
      <PostsList />
    </aside>
  );
};

export default Sidebar;
