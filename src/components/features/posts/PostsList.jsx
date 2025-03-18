import { useEffect, useState } from "react";
import PostAPI from "../../../apis/endpoints/posts";
import { Link } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";

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
    <div className="flex flex-col items-start gap-4 py-4">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.slug}`}>
          <p className="text-xs text-title font-title font-normal italic leading-tight hover:text-hover hover:translate-x-2 transition-all duration-300 cursor-pointer line-clamp-2">
            <span>{post.title}</span>
          </p>
        </Link>
      ))}
    </div>
  );
};

export default PostsList;
