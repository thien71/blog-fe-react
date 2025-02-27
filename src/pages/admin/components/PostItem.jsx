import { formatDistanceToNow } from "date-fns";
import vi from "date-fns/locale/vi";

const PostItem = ({ post, type = "popular" }) => {
  const formatDate = (date) => {
    if (!date) return "";
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi });
  };

  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
      <img
        src={post.thumbnail || "https://placehold.co/80x48"}
        alt={post.title}
        className="aspect-[5/3] object-cover w-20 h-12 bg-gray-300 rounded-md block"
      />
      <div className="ml-4">
        <p className="text-sm font-semibold line-clamp-1">{post.title}</p>
        {type === "popular" ? (
          <p className="text-xs text-gray-500">{post.views} lượt xem</p>
        ) : (
          <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
        )}
      </div>
    </div>
  );
};

export default PostItem;
