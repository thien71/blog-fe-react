import { Link } from "react-router-dom";
import { Divider } from "../../../../components";
import { PostItem } from "../../../../components/index";
import { GoDotFill } from "react-icons/go";
import useFetchAPI from "../../../../hooks/useFetchAPI";
import PostAPI from "../../../../apis/endpoints/posts";

const CategoryPosts = () => {
  const {
    data: categories,
    loading,
    error,
    refetch: fetchData,
  } = useFetchAPI(PostAPI.getRandomByCategory, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-3/5 pl-8 border-l border-gray-300">
      {categories.map((category, index) => (
        <div key={category.id}>
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
                <Link
                  className="block w-2/3"
                  to={`/posts/${category.posts[0].slug}`}
                >
                  <PostItem
                    post={category.posts[0]}
                    layout="image-left-summary"
                    imageWidth="50%"
                    titleClass="text-[15px] mb-2"
                    summaryClass="text-sm"
                  />
                </Link>

                {category.posts[1] && (
                  <Link
                    className="block w-1/3"
                    to={`/posts/${category.posts[1].slug}`}
                  >
                    <PostItem
                      post={category.posts[1]}
                      layout="title-summary"
                      titleClass="text-[15px] mb-2"
                      summaryClass="text-sm"
                    />
                  </Link>
                )}
              </div>

              <Divider spacing="my-2" />
              <div className="flex justify-between items-center gap-1">
                {category.posts.slice(2, 5).map((post) => (
                  <div key={post.id} className="flex items-center gap-1 flex-1">
                    <GoDotFill color="#ababab" className="w-3 h-3 shrink-0" />
                    <Link to={`/posts/${post.slug}`}>
                      <PostItem
                        post={post}
                        layout="title-only"
                        titleClass="text-sm font-semibold text-left cursor-pointer hover:text-hover block flex-1 line-clamp-3"
                      />
                    </Link>
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
