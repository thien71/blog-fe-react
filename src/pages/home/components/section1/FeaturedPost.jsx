import PostAPI from "../../../../apis/endpoints/posts";
import { PostItem } from "../../../../components/index";
import { Link } from "react-router-dom";
import useFetchAPI from "../../../../hooks/useFetchAPI";

const FeaturedPost = () => {
  const { data: post, loading, error } = useFetchAPI(PostAPI.getLatest);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <article className="cursor-pointer text-xl">
      {post.length > 0 ? (
        post.map((post) => {
          return (
            <Link
              key={post.id}
              to={`/posts/${post.slug}`}
              className="leading-relaxed"
            >
              <PostItem
                post={post}
                layout="image-left-summary"
                imageRatio="aspect-[5/3]"
                imageWidth="50%"
                titleClass="!text-2xl mb-4 !leading-normal line-clamp-none ml-4 w-2/3"
                summaryClass="text-base leading-relaxed ml-4 w-2/3 line-clamp-none"
              />
            </Link>
          );
        })
      ) : (
        <p>Đang tải bài viết nổi bật...</p>
      )}
    </article>
  );
};

export default FeaturedPost;
