import { PostItem } from "../../../../components/index";
import { Link } from "react-router-dom";

const TopViewedPosts = ({ data: posts }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <Link to={`/posts/${post.slug}`} key={index}>
          <PostItem
            key={post.id}
            post={post}
            layout="image-title"
            imageRatio="aspect-[5/3]"
            imagePosition="bottom"
            imageWidth="100%"
            titleClass="text-base font-bold min-h-[60px]"
          />
        </Link>
      ))}
    </div>
  );
};

export default TopViewedPosts;
