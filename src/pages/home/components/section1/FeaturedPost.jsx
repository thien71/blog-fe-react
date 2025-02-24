import { useEffect, useState } from "react";
import { PostInfo } from "../../../../components";
import PostAPI from "../../../../apis/endpoints/posts";

const FeaturedPost = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await PostAPI.getLatest();
        console.log("📌 API Response:", response.data);

        if (response.data.data && response.data.data.length > 0) {
          setPost(response.data.data[0]);
        }
      } catch (error) {
        console.error("❌ Lỗi khi tải bài viết mới nhất:", error);
      }
    };

    fetchLatestPost();
  }, []);

  useEffect(() => {
    console.log("📌 Dữ liệu bài viết đã cập nhật:", post);
  }, [post]);

  return (
    <article className="flex gap-6">
      <img
        src={post?.thumbnail || "https://placehold.co/500x300"}
        alt={post?.title || "Featured"}
        className="max-w-lg max-h-80 block object-cover aspect-[5/3] w-[500px] h-[300px] rounded-lg"
      />
      {post ? (
        <PostInfo
          title={post.title}
          summary={post.summary || "Không có mô tả"}
          isUppercase
        />
      ) : (
        <p>Đang tải bài viết nổi bật...</p>
      )}
    </article>
  );
};

export default FeaturedPost;
