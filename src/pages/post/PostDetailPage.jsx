import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostAPI from "../../apis/endpoints/posts";
import PostItem from "./components/PostItem";
import {
  DetailPostContent,
  DetailPostHeader,
  DetailPostTag,
} from "../../components";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedCategories, setRelatedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostAPI.getBySlug(slug);
        const postData = response.data.data;
        setPost(postData);

        const relatedResponse = await PostAPI.getRelated(postData.id, 3);
        setRelatedPosts(relatedResponse.data.data);

        const relatedCategoriesResponse = await PostAPI.getRelated(
          postData.id,
          10
        );
        setRelatedCategories(relatedCategoriesResponse.data.data);
      } catch (err) {
        setError("Không tìm thấy bài viết!");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <Skeleton height={1000} width="780px" />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto px-6">
      <DetailPostHeader post={post} />

      <DetailPostContent post={post} />

      <ul className="w-full p-4 border">
        {relatedPosts.map((post, index) => (
          <PostItem
            key={post.id}
            post={post}
            className={
              index === relatedPosts.length - 1 ? "border-none !pb-0 !mb-0" : ""
            }
          />
        ))}
      </ul>

      <DetailPostTag tags={post.tags} />

      {/* Posts related */}
      <div className="">
        <h5 className="text-lg font-title text-title whitespace-nowrap mb-6 border-b-2 border-primary inline-block">
          {post.category.name}
        </h5>
        <ul className="w-full">
          {relatedCategories.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPage;
