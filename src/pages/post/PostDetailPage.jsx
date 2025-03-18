import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import PostAPI from "../../apis/endpoints/posts";
import PostItem from "./components/PostItem";

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

  if (loading) return <p className="text-center text-gray-600">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const convertToVietnamTime = (utcDate) => {
    const date = new Date(utcDate);
    date.setHours(date.getHours() + 7);
    return date;
  };

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div>
        <div className="flex items-center justify-between text-sm text-secondary mb-6">
          <span className="text-views text-base font-summary font-semibold">
            {post.category.name}
          </span>
          <span>
            {format(
              convertToVietnamTime(post.created_at),
              "EEEE, dd/MM/yyyy - HH:mm (OOOO)",
              { locale: vi }
            )}
          </span>
        </div>

        <h1 className="text-3xl font-title font-bold text-title mb-6">
          {post.title}
        </h1>
      </div>

      <div
        className="prose max-w-full text-title font-summary text-lg leading-relaxed font-normal mb-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <p className="mb-6 text-title text-end text-lg font-summary">
        <span className="font-semibold">{post.author.name}</span>
      </p>

      <ul className="w-full p-4 border mb-6">
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

      <div className="flex items-center gap-8 pt-2 pb-4 mb-6 border-b">
        <h5 className="text-sm font-medium text-secondary whitespace-nowrap">
          Tags:
        </h5>

        <ul className="flex flex-wrap gap-8 max-h-8">
          {post.tags.map((tag) => (
            <li key={tag.id} className="group relative">
              <div className="relative px-4 py-[6px] bg-black flex items-center group-hover:bg-gray-700">
                <div
                  className="absolute top-0 left-[-16px] border-y-[16px] border-r-[16px] border-transparent
                 border-r-black group-hover:border-r-gray-700"
                ></div>
                <div className="absolute top-3 -left-1 rounded-full p-1 bg-white"></div>
                <a
                  href="#"
                  className="block text-white text-sm group-hover:text-white"
                >
                  {tag.name}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <h5 className="text-lg font-title text-title whitespace-nowrap mb-6 border-b-2 border-primary inline-block">
          {post.category.name}
        </h5>
        <ul className="w-full mb-6">
          {relatedCategories.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}

          {/* <PostItem post={post} />
          <PostItem post={post} />
          <PostItem post={post} /> */}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPage;
