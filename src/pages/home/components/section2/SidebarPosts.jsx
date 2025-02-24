import { useCallback, useEffect, useState } from "react";
import PostAPI from "../../../../apis/endpoints/posts";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../../../components";

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
          className="flex flex-col cursor-pointer"
          onClick={() => handleOnclick(post)}
        >
          <h3 className="text-title text-base font-bold font-title text-justify mb-2 hover:text-hover transition-colors">
            {post.title}
          </h3>
          <div className="flex gap-x-2">
            <div className="w-2/5">
              <img
                title={post.title}
                src={post.thumbnail || "https://placehold.co/150x90"}
                alt={post.title}
                className="w-full object-cover aspect-[5/3] max-w-xs max-h-40 block"
              />
            </div>

            <p className="w-3/5 text-summary text-sm font-summary text-left font-thin leading-relaxed line-clamp-4">
              {post.content ?? ""}
            </p>
          </div>
          <Divider spacing="my-2" />
        </div>
      ))}
    </aside>
  );
};
export default SidebarPosts;
