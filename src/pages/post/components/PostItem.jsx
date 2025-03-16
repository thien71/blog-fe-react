const PostItem = ({ className, post }) => {
  return (
    <li className={`w-full flex gap-4 pb-4 border-b mb-4 ${className}`}>
      <div className="w-36">
        <img
          src={post?.thumbnail}
          alt={post?.title}
          className="object-cover aspect-[5/3]"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-title font-title font-bold mb-2 leading-normal">
          {post?.title}
        </h3>
        <p className="text-summary font-summary text-sm line-clamp-2 leading-relaxed">
          {post?.title}
        </p>
      </div>
    </li>
  );
};

export default PostItem;
