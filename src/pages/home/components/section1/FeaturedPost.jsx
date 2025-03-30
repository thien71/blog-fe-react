import { Link } from "react-router-dom";

const FeaturedPost = ({ data: posts }) => {
  return (
    <article className="cursor-pointer text-base xl:text-xl">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.slug}`}>
            <div className="flex flex-col md:flex-row w-full gap-x-6">
              <div className="mb-4 md:mb-0 ">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full max-h-96 object-cover aspect-[5/3]"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-0">
                <h3 className="w-full xl:w-2/3 font-title text-title text-base md:text-xl xl:text-2xl font-bold leading-normal md:mb-4 line-clamp-none">
                  {post.title}
                </h3>
                <p className="w-full xl:w-2/3 font-summary text-summary text-base leading-snug md:leading-relaxed line-clamp-4 md:line-clamp-none">
                  {post.summary}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Đang tải bài viết nổi bật...</p>
      )}
    </article>
  );
};

export default FeaturedPost;
