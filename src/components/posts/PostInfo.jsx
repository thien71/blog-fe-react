import { Link } from "react-router-dom";

const PostInfo = ({
  title,
  summary,
  time,
  link,
  titleSize = "text-2xl",
  summarySize = "text-sm",
  isUppercase = false,
  clampLines = 0,
  className,
}) => {
  return (
    <div className={className}>
      {title && (
        <h2
          className={`${titleSize} ${isUppercase ? "uppercase" : ""} ${
            clampLines ? `line-clamp-${clampLines}` : ""
          } font-bold text-title font-title mb-2 leading-tight`}
        >
          <Link to={link} className="transition-colors">
            {title}
          </Link>
        </h2>
      )}

      {summary && (
        <p className={`${summarySize} text-summary font-summary line-clamp-4`}>
          {summary}
        </p>
      )}

      {time && <time className="text-gray-500 text-xs block mt-1">{time}</time>}
    </div>
  );
};

export default PostInfo;
