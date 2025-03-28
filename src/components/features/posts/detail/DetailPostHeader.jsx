import { format } from "date-fns";
import vi from "date-fns/locale/vi";
const DetailPostHeader = ({ post, className }) => {
  const convertToVietnamTime = (utcDate) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 7);
    return date;
  };

  return (
    <div className={`flex flex-col gap-6 mb-6 ${className}`}>
      <div
        className={`flex items-center justify-between text-sm text-secondary`}
      >
        <span className="text-views text-base font-summary font-semibold">
          {post.category.name}
        </span>
        <span>
          {format(
            convertToVietnamTime(post.created_at),
            "EEEE, dd/MM/yyyy - HH:mm (OOOO)",
            { locale: vi }
          )}
        </span>
      </div>

      <h1 className="text-3xl font-title font-bold text-title">{post.title}</h1>
    </div>
  );
};

export default DetailPostHeader;
