import { useState, useEffect } from "react";
import PostAPI from "../../apis/endpoints/posts";
import { PostItem } from "../../components/index";
import { Divider } from "../index";

const PostsSidebar = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getPopular(5);
        if (response.data.data?.length) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết phổ biến:", error);
      }
    })();
  }, []);

  return (
    <aside className="w-3/12 pl-0 hidden md:block">
      <div className="sticky top-16">
        <h2 className="text-lg font-semibold mb-4">Top bài viết</h2>
        <div className="flex flex-col gap-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div>
                <PostItem
                  key={post.id}
                  post={post}
                  layout="image-title"
                  imagePosition="left"
                  titleClass="text-sm font-normal line-clamp-4"
                />
                <Divider spacing="my-2" />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Không có bài viết nào.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default PostsSidebar;
