import { SocialLinks } from "../index";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 h-screen bg-yellow-200 w-[200px] top-16 px-4 py-8">
      <SocialLinks />
      {/* <PostsList /> */}
    </aside>
  );
};

export default Sidebar;
