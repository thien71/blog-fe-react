import { Link } from "react-router-dom";
import { Divider } from "../../../../components";

const SidebarPosts = ({ data: posts }) => {
  return (
    <aside className="w-full xl:w-2/5 xl:max-w-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-0 md:gap-x-8 md:gap-y-4 xl:gap-y-0">
      {posts.map((post) => (
        <div key={post.id} className="cursor-pointer">
          <Link to={`/posts/${post.slug}`}>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="font-title text-title text-base font-bold leading-tight line-clamp-2 md:h-10 hover:text-views xl:h-auto">
                {post.title}
              </h3>
              <div className="flex flex-col-reverse md:flex-row items-start gap-0 md:gap-3">
                <div className="w-full md:w-1/2">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full object-cover aspect-[5/3]"
                  />
                </div>
                <p className="flex-1 mb-2 md:mb-0 font-summary text-sm text-summary line-clamp-5">
                  {post.summary}
                </p>
              </div>
            </div>
          </Link>
          <Divider spacing="my-2" />
        </div>
      ))}
    </aside>
  );
};

export default SidebarPosts;
