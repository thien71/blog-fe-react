import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const PostItem = ({
  post,
  layout = "image-left-summary",
  imageRatio = "aspect-[5/3]",
  imageWidth = "40%",
  imagePosition = "top",
  titleClass = "",
  summaryClass = "",
  className = "",
}) => {
  const navigate = useNavigate();

  const defaultTitleClass =
    "font-title text-base text-title font-bold line-clamp-3 leading-tight";
  const defaultSummaryClass = "font-summary text-sm text-summary line-clamp-4";

  const renderImage = (position) => (
    <div
      className={
        position === "left" || position === "right" ? "flex-shrink-0" : ""
      }
      style={{ width: imageWidth }}
    >
      <img
        src={post.thumbnail}
        alt={post.title}
        className={`w-full min-h object-cover ${imageRatio}`}
      />
    </div>
  );

  return (
    <div
      className={`${className} cursor-pointer flex items-start gap-3`}
      onClick={() => navigate(`/posts/${post.slug}`)}
    >
      {layout === "image-left-summary" && (
        <div className="flex w-full gap-3">
          {post.thumbnail && renderImage("left")}
          <div
            className="flex flex-col"
            style={{
              width: post.thumbnail ? `calc(100% - ${imageWidth})` : "100%",
            }}
          >
            <h3 className={clsx(defaultTitleClass, titleClass)}>
              {post.title}
            </h3>
            {post.summary && (
              <p className={clsx(defaultSummaryClass, summaryClass)}>
                {post.summary}
              </p>
            )}
          </div>
        </div>
      )}

      {layout === "title-image-summary" && (
        <div className="flex flex-col w-full gap-2">
          <h3 className={clsx(defaultTitleClass, titleClass)}>{post.title}</h3>
          <div className="flex items-start gap-3">
            {post.thumbnail && renderImage("left")}
            {post.summary && (
              <p className={clsx(defaultSummaryClass, summaryClass)}>
                {post.summary}
              </p>
            )}
          </div>
        </div>
      )}

      {layout === "image-title" && post.thumbnail && (
        <div
          className={clsx(
            "flex items-start gap-3 w-full",
            imagePosition === "top" || imagePosition === "bottom"
              ? "flex-col"
              : "flex-row"
          )}
        >
          {(imagePosition === "top" || imagePosition === "left") &&
            renderImage(imagePosition)}
          <h3 className={clsx("text-left", defaultTitleClass, titleClass)}>
            {post.title}
          </h3>
          {(imagePosition === "bottom" || imagePosition === "right") &&
            renderImage(imagePosition)}
        </div>
      )}

      {layout === "title-summary" && (
        <div className="flex flex-col">
          <h3 className={clsx(defaultTitleClass, titleClass)}>{post.title}</h3>
          {post.summary && (
            <p className={clsx(defaultSummaryClass, summaryClass)}>
              {post.summary}
            </p>
          )}
        </div>
      )}

      {layout === "title-only" && (
        <h3 className={clsx(defaultTitleClass, titleClass)}>{post.title}</h3>
      )}
    </div>
  );
};

export default PostItem;
