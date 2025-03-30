import { Link } from "react-router-dom";

const TopViewedPosts = ({ data: posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-x-4">
      {posts.map((post, index) => (
        <Link to={`/posts/${post.slug}`} key={index}>
          <div className="group flex flex-col w-full gap-2">
            <h3 className="font-title text-title text-base md:h-10 font-bold leading-tight line-clamp-2 group-hover:text-views">
              {post.title}
            </h3>
            <p className="font-summary text-summary text-base leading-snug line-clamp-4 w-full">
              {post.summary}
            </p>
            <div className="mb-4 md:mb-0">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full max-h-52 aspect-[5/3] object-cover"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TopViewedPosts;
