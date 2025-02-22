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
}) => {
  return (
    <article className={`flex gap-4 justify-between items-start ${className}`}>
      {image && (
        <div className={`${imgRatio} rounded-md`}>
          <img
            src={image}
            alt="Post Thumbnail"
            className="w-auto h-auto object-cover aspect-[5/3]"
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
      />
    </article>
  );
};

export default PostGridItem;
