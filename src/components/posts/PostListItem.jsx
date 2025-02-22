import PostInfo from "./PostInfo";

const PostListItem = () => {
  return (
    <article className="border-b border-gray-200 py-4">
      <PostInfo
        title="Liverpool vùi dập Chelsea 4-1"
        summary="Liverpool có màn trình diễn áp đảo trên sân nhà, ghi 4 bàn thắng để củng cố ngôi đầu."
        time="25 tháng 2, 2025"
        link="/liverpool-chelsea"
      />
    </article>
  );
};

export default PostListItem;
