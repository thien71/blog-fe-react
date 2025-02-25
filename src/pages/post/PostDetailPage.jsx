import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostAPI from "../../apis/endpoints/posts";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostAPI.getBySlug(slug);
        setPost(response.data.data);
      } catch (err) {
        setError("Không tìm thấy bài viết!");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetailPage;
