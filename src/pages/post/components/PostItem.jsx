import { Link } from "react-router-dom";

const PostItem = ({ className, post }) => {
  return (
    <li className={`group w-full flex gap-4 pb-4 border-b mb-4 ${className}`}>
      <Link to={`/posts/${post.slug}`} className="flex gap-4 w-full">
        <div className="w-36">
          <img
            src={post?.thumbnail}
            alt={post?.title}
            className="object-cover aspect-[5/3]"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-title font-title font-bold mb-2 leading-normal group-hover:text-views">
            {post?.title}
          </h3>
          <p className="text-summary font-summary text-sm line-clamp-2 leading-relaxed">
            {post?.summary}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
