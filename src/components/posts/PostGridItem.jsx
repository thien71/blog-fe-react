import PostInfo from "./PostInfo";

const PostGridItem = ({
  title,
  titleSize,
  summary,
  summarySize,
  time,
  link,
  image,
  imgRatio = "w-1/4",
  className,
  isUppercase = false,
  clampLines,
}) => {
  return (
    <article className={`flex gap-2 justify-start items-start ${className}`}>
      {image && (
        <div className={`${imgRatio} rounded-md`}>
          <img
            title={title}
            src={image}
            alt="Post Thumbnail"
            className="w-full max-w-sm max-h-36 object-cover aspect-[5/3]"
          />
        </div>
      )}
      <PostInfo
        title={title}
        summary={summary}
        time={time}
        link={link}
        titleSize={titleSize}
        summarySize={summarySize}
        isUppercase={isUppercase}
        className={"w-1/2"}
        clampLines={clampLines}
      />
    </article>
  );
};

export default PostGridItem;
