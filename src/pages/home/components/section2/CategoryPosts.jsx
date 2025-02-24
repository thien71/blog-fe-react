import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PostAPI from "../../../../apis/endpoints/posts";
import { Link } from "react-router-dom";
import { Divider, PostGridItem, PostInfo } from "../../../../components";
import { GoDotFill } from "react-icons/go";

const CategoryPosts = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getRandomByCategory();
        if (response.data?.length) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách bài viết theo danh mục:", error);
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
    <div className="w-3/5 pl-8 border-l border-gray-300">
      {categories.map((category, index) => (
        <div key={category.id} className="">
          <h2 className="relative inline-block text-title text-lg font-extrabold font-title leading-relaxed mb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary">
            <Link
              to={`/categories/${category.name.toLowerCase()}`}
              alt={category.name}
            >
              {category.name}
            </Link>
          </h2>

          {category.posts.length > 0 ? (
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4">
                <PostGridItem
                  title={category.posts[0].title}
                  image={
                    category.posts[0].thumbnail ||
                    "https://placehold.co/225x135"
                  }
                  imgRatio="w-1/2"
                  summary={category.posts[0].summary || "Không có mô tả"}
                  titleSize="text-base"
                  className="w-2/3 "
                  onClick={() => handleOnclick(category.posts[0])}
                  clampLines={3}
                />

                {category.posts[1] && (
                  <PostInfo
                    title={category.posts[1].title}
                    titleSize="text-base"
                    summary={category.posts[1].summary || "Không có mô tả"}
                    clampLines={3}
                    className="w-1/3"
                    onClick={() => handleOnclick(category.posts[1])}
                  />
                )}
              </div>

              <Divider spacing="my-2" />
              <div className="flex justify-between items-center gap-1">
                {category.posts.slice(2, 5).map((post) => (
                  <div className="flex items-center gap-1 flex-1">
                    <GoDotFill color="#ABABAB" />
                    <h3
                      key={post.id}
                      className="text-sm font-semibold text-left cursor-pointer hover:text-hover block flex-1 line-clamp-3"
                      onClick={() => handleOnclick(post)}
                    >
                      {post.title}
                    </h3>
                  </div>
                ))}
              </div>

              {index !== categories.length - 1 && <Divider spacing="my-2" />}
            </div>
          ) : (
            <p className="text-gray-500">Không có bài viết nào</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryPosts;
