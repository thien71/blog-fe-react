import { useCallback, useEffect, useState } from "react";
import PostAPI from "../../../../apis/endpoints/posts";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../../../components";
import PostItem from "../../../../components/posts/PostItem";

const SidebarPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  const handleOnclick = useCallback(
    (post) => {
      if (post) {
        navigate(`/posts/${post.slug}`);
      }
    },
    [navigate]
  );

  return (
    <aside className="w-2/5 max-w-md">
      {posts.map((post) => (
        <div
          key={post.id}
          className="cursor-pointer"
          onClick={() => handleOnclick(post)}
        >
          <PostItem
            post={post}
            layout="title-image-summary"
            imageRatio="aspect-[5/3]"
          />
          <Divider spacing="my-2" />
        </div>
      ))}
    </aside>
  );
};

export default SidebarPosts;
