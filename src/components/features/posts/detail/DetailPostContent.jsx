const DetailPostContent = ({ post, className }) => {
  return (
    <div className={`${className}`}>
      <div
        className="prose max-w-full text-title font-summary text-lg leading-relaxed font-normal"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <p className="text-title text-end text-lg font-summary">
        <span className="font-semibold">{post.author.name}</span>
      </p>
    </div>
  );
};

export default DetailPostContent;
