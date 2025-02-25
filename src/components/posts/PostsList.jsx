import { useEffect, useState } from "react";
import { PostItem } from "../index";
import PostAPI from "../../apis/endpoints/posts";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getAll();
        if (response.data.data?.length) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết", error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-start gap-2 py-4">
      {posts.map((post) => (
        <p
          key={post.id}
          className="text-xs text-title font-normal italic hover:text-hover hover:not-italic transition-all cursor-pointer line-clamp-3"
        >
          {post.title}
        </p>
      ))}
    </div>
  );
};

export default PostsList;
