import { useEffect, useState } from "react";
import PostAPI from "../../../../apis/endpoints/posts";
import PostItem from "../../../../components/posts/PostItem";

const TopViewedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getPopular();
        if (response.data.data?.length) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết phổ biến:", error);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          layout="image-title"
          imageRatio="aspect-[5/3]"
          imagePosition="bottom"
          imageWidth="100%"
          titleClass="text-base font-bold min-h-[60px]"
        />
      ))}
    </div>
  );
};

export default TopViewedPosts;
