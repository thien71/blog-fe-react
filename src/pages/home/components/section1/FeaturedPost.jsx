import { useCallback, useEffect, useState } from "react";
import { PostInfo } from "../../../../components";
import PostAPI from "../../../../apis/endpoints/posts";
import { useNavigate } from "react-router-dom";

const FeaturedPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getLatest();
        if (response.data.data?.length) {
          setPost(response.data.data[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết mới nhất:", error);
      }
    })();
  }, []);

  const handleOnclick = useCallback(
    (post) => {
      if (post) {
        navigate(`/posts/${post.slug}`);
      }
    },
    [navigate]
  );

  return (
    <article
      className="flex gap-6 cursor-pointer"
      onClick={post ? handleOnclick : undefined}
    >
      {post ? (
        <>
          <img
            title={post.title}
            src={post.thumbnail}
            alt={post.title}
            className="max-w-lg max-h-80 block object-cover aspect-[5/3] w-[500px] h-[300px]"
          />
          <PostInfo title={post.title} summary={post.content || ""} />
        </>
      ) : (
        <p>Đang tải bài viết nổi bật...</p>
      )}
    </article>
  );
};

export default FeaturedPost;
