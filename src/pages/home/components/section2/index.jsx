import SidebarPosts from "./SidebarPosts";
import CategoryPosts from "./CategoryPosts";

const Section2 = () => {
  return (
    <section className="flex gap-x-8">
      <SidebarPosts />
      <CategoryPosts />
    </section>
  );
};

export default Section2;
