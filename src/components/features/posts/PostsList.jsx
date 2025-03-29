import { useEffect, useState } from "react";
import PostAPI from "../../../apis/endpoints/posts";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await PostAPI.getAll();
        if (response.data.data?.length) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Skeleton count={10} className="mb-4" height={40} />;
  }

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
