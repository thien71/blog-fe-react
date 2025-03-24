import PostAPI from "../../../../apis/endpoints/posts";
import { Link } from "react-router-dom";
import { Divider } from "../../../../components";
import { PostItem } from "../../../../components/index";
import useFetchAPI from "../../../../hooks/useFetchAPI";

const SidebarPosts = () => {
  const { data: posts, loading, error } = useFetchAPI(PostAPI.getRandom);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <aside className="w-2/5 max-w-md">
      {posts.map((post) => (
        <div key={post.id} className="cursor-pointer">
          <Link to={`/posts/${post.slug}`}>
            <PostItem
              post={post}
              layout="title-image-summary"
              imageRatio="aspect-[5/3]"
            />
          </Link>
          <Divider spacing="my-2" />
        </div>
      ))}
    </aside>
  );
};

export default SidebarPosts;
