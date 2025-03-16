import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import PostAPI from "../../apis/endpoints/posts";

import { Divider } from "../../components";

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
        {/* <PostItem /> */}
        <li className="w-full flex gap-4 pb-4 border-b mb-4">
          <div className="w-36">
            <img
              src={post.thumbnail}
              alt=""
              className="object-cover aspect-[5/3]"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-title font-title font-bold mb-2 leading-normal">
              {post.title}
            </h3>
            <p className="text-summary font-summary text-sm line-clamp-2 leading-relaxed">
              {post.title}
            </p>
          </div>
        </li>
        <li className="w-full flex gap-4">
          <div className="w-36">
            <img
              src={post.thumbnail}
              alt=""
              className="object-cover aspect-[5/3]"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-title font-title font-bold mb-2 leading-normal">
              {post.title}
            </h3>
            <p className="text-summary font-summary text-sm line-clamp-2 leading-relaxed">
              {post.title}
            </p>
          </div>
        </li>
      </ul>

      <div className="flex items-center gap-3 mt-6">
        <h5 className="text-base font-medium text-title whitespace-nowrap">
          Tags:
        </h5>

        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag.id}>
              <a
                href="#"
                className="bg-title text-white text-base px-4 py-1 before:content-[''] before:top-0 before:left-0 before:w-0 before:h-0
                        before:border-solid before:border-[30px] before:border-transparent before:border-l-red-500 before:rotate-90
                       "
              >
                {tag.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetailPage;
