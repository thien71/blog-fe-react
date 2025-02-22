import { Link } from "react-router-dom";

const PostInfo = ({
  title,
  summary,
  time,
  link,
  titleSize = "text-2xl",
  summarySize = "text-sm",
  isUppercase = false,
  className,
}) => {
  return (
    <div className={className}>
      {title && (
        <h2
          className={`${titleSize} ${
            isUppercase ? "uppercase" : ""
          } font-bold text-title font-title mb-2 min-h-12`}
        >
          <Link to={link} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h2>
      )}

      {summary && (
        <p
          className={`${summarySize} text-summary font-summary mt-2 text-justify line-clamp-3`}
        >
          {summary}
        </p>
      )}

      {time && <time className="text-gray-500 text-xs block mt-1">{time}</time>}
    </div>
  );
};

export default PostInfo;
