import { useEffect, useState } from "react";
import PostAPI from "../../../../apis/endpoints/posts";
import { PostItem } from "../../../../components/index";
import { Link } from "react-router-dom";

const FeaturedPost = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getLatest();
        if (response.data.data?.length) {
          setPost(response.data.data[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết nổi bật:", error);
      }
    })();
  }, []);

  return (
    <article className="cursor-pointer text-xl">
      {post ? (
        <Link to={`/posts/${post.slug}`}>
          <PostItem
            post={post}
            layout="image-left-summary"
            imageRatio="aspect-[5/3]"
            imageWidth="66%"
            titleClass="text-xl mb-4 leading-normal line-clamp-none"
            summaryClass="text-base"
          />
        </Link>
      ) : (
        <p>Đang tải bài viết nổi bật...</p>
      )}
    </article>
  );
};

export default FeaturedPost;
