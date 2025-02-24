import { useCallback, useEffect, useState } from "react";
import PostAPI from "../../../../apis/endpoints/posts";
import { useNavigate } from "react-router-dom";

const TopViewedPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getPopular();
        if (response.data.data?.length) {
          setPosts(response.data.data);
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
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex justify-between flex-col gap-2 cursor-pointer"
          onClick={() => handleOnclick(post)}
        >
          <h3
            className="text-title text-base font-bold font-title text-left line-clamp-2"
            title={post.title}
          >
            {post.title}
          </h3>
          <img
            title={post.title}
            src={post.thumbnail || "https://placehold.co/250x150"}
            alt={post.title}
            className="object-cover w-full max-w-xs max-h-40 block aspect-[5/3]"
          />
        </article>
      ))}
    </div>
  );
};

export default TopViewedPosts;
