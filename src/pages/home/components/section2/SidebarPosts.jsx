import { Link } from "react-router-dom";
import { Divider } from "../../../../components";
import { PostItem } from "../../../../components/index";

const SidebarPosts = ({ data: posts }) => {
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
