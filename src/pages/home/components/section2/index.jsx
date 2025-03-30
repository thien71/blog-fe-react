import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFetchAPI from "../../../../hooks/useFetchAPI";
import PostAPI from "../../../../apis/endpoints/posts";
import SidebarPosts from "./SidebarPosts";
import CategoryPosts from "./CategoryPosts";

const Section2 = () => {
  const {
    data: sidebarPosts,
    loading: loadingSidebar,
    error: errorSidebar,
  } = useFetchAPI(PostAPI.getRandom, [10]);

  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchAPI(PostAPI.getRandomByCategory, [6]);

  return (
    <section className="flex flex-col xl:flex-row gap-x-8 ">
      {loadingSidebar ? (
        <div className="w-full xl:w-2/5">
          <Skeleton width="100%" count={10} height={140} className="mb-1" />
        </div>
      ) : errorSidebar ? (
        <p>Error: {errorSidebar}</p>
      ) : (
        <SidebarPosts data={sidebarPosts} />
      )}

      {loadingCategories ? (
        <div className="w-full xl:w-3/5">
          <Skeleton height={200} width="100%" count={5} className="mb-2" />
        </div>
      ) : errorCategories ? (
        <p>Error: {errorCategories}</p>
      ) : (
        <CategoryPosts data={categories} />
      )}
    </section>
  );
};

export default Section2;
