import { useEffect, useState } from "react";
import PostAPI from "../../../../apis/endpoints/posts";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "../../../../components";
import { PostItem } from "../../../../components/index";

const SidebarPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getRandom();
        if (response.data.data?.length) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết mới nhất:", error);
      }
    })();
  }, []);

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
