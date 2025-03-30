import { Link } from "react-router-dom";
import { Divider } from "../../../../components";
import { GoDotFill } from "react-icons/go";

const CategoryPosts = ({ data: categories }) => {
  return (
    <div className="w-full xl:w-3/5 xl:pl-8 xl:border-l border-gray-300">
      {categories.map((category, index) => (
        <div key={category.id}>
          <h2 className="relative inline-block font-title text-title text-lg font-extrabold leading-relaxed mb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary">
            <Link
              to={`/categories/${category.name.toLowerCase()}`}
              alt={category.name}
            >
              {category.name}
            </Link>
          </h2>

          {category.posts.length > 0 ? (
            <div className="flex flex-col gap-2 xl:gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  className="block w-full md:w-2/3"
                  to={`/posts/${category.posts[0].slug}`}
                >
                  <div className="flex flex-col md:flex-row w-full gap-0 md:gap-3">
                    <div className="w-full md:w-1/2 mb-2 md:mb-0">
                      <img
                        src={category.posts[0].thumbnail}
                        alt={category.posts[0].title}
                        className="w-full object-cover aspect-[5/3]"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3 className="w-full font-title text-title text-base font-bold leading-tight text-[15px] mb-2 line-clamp-3">
                        {category.posts[0].title}
                      </h3>
                      {category.posts[0].summary && (
                        <p className="font-summary text-summary text-sm line-clamp-4">
                          {category.posts[0].summary}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>

                {category.posts[1] && (
                  <Link
                    className="block w-full md:w-1/3"
                    to={`/posts/${category.posts[1].slug}`}
                  >
                    <div className="flex flex-col">
                      <h3 className="font-title text-title text-base font-bold leading-tight text-[15px] mb-2 line-clamp-3">
                        {category.posts[1].title}
                      </h3>
                      {category.posts[1].summary && (
                        <p className="font-summary text-summary text-sm line-clamp-4">
                          {category.posts[1].summary}
                        </p>
                      )}
                    </div>
                  </Link>
                )}
              </div>

              <Divider spacing="my-2" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-1">
                {category.posts.slice(2, 5).map((post) => (
                  <div key={post.id} className="flex items-center flex-1 gap-1">
                    <GoDotFill className="w-3 h-3 shrink-0" color="#ababab" />
                    <Link to={`/posts/${post.slug}`}>
                      <h3 className="block flex-1 font-title text-title text-sm font-semibold leading-tight text-left cursor-pointer hover:text-hover line-clamp-3">
                        {post.title}
                      </h3>
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
