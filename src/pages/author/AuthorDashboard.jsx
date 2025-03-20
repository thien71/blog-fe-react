import { useEffect, useState } from "react";
import { FaFileAlt, FaUsers, FaTags, FaList } from "react-icons/fa";
import StatCard from "../admin/components/StatCard";
import TagCategoryList from "../admin/components/TagCategoryList";
import PostItem from "../admin/components/PostItem";
import PostAPI from "../../apis/endpoints/posts";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AuthorDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 120,
    totalUsers: 45,
    totalCategories: 8,
    totalTags: 15,
  });

  const [topPosts, setTopPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getPopular(10);
        if (response.data.data?.length) {
          setTopPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết phổ biến:", error);
      }
    })();
  }, []);

  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await PostAPI.getLatest(5);
        if (response.data.data?.length) {
          setRecentPosts(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết nổi bật:", error);
      }
    })();
  }, []);

  const [popularTags, setPopularTags] = useState([
    { name: "React", count: 10 },
    { name: "Laravel", count: 8 },
    { name: "SEO", count: 6 },
  ]);

  const [popularCategories, setPopularCategories] = useState([
    { name: "Lập trình", count: 12 },
    { name: "Công nghệ", count: 9 },
    { name: "Kinh doanh", count: 7 },
  ]);

  return (
    <div className="grid grid-cols-4 gap-3">
      <Link
        to={"/author/posts/create"}
        className="group hover:text-white hover:bg-primary/90 bg-primary text-white shadow-md rounded-lg px-4 py-2 flex items-center justify-center space-x-4"
      >
        <div className="text-white">
          <FaPenToSquare size={30} />
        </div>
        <div>
          <p className="text-xl font-semibold">Viết bài</p>
        </div>
      </Link>
      <StatCard
        icon={<FaFileAlt size={28} />}
        title="Bài viết"
        value={stats.totalPosts}
      />
      <StatCard
        icon={<FaList size={30} />}
        title="Danh mục"
        value={stats.totalCategories}
      />
      <StatCard
        icon={<FaTags size={30} />}
        title="Tags"
        value={stats.totalTags}
      />
      <div className="col-span-full grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">
            Top 10 bài viết nhiều lượt xem
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1 space-y-2">
              {topPosts.slice(0, 5).map((post, index) => (
                <PostItem key={index} post={post} type="popular" />
              ))}
            </div>
            <div className="col-span-1 space-y-2">
              {topPosts.slice(5, 10).map((post, index) => (
                <PostItem key={index} post={post} type="popular" />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Bài viết gần đây</h2>
          <div className="space-y-2">
            {recentPosts.map((post, index) => (
              <PostItem key={index} post={post} type="latest" />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg py-3 px-4 col-span-2">
        <h2 className="text-lg font-semibold mb-2">Danh mục phổ biến</h2>
        <TagCategoryList items={popularCategories} />
      </div>

      <div className="bg-white shadow-md rounded-lg py-3 px-4 col-span-2">
        <h2 className="text-lg font-semibold mb-2">Tag phổ biến</h2>
        <TagCategoryList items={popularTags} />
      </div>
    </div>
  );
};

export default AuthorDashboard;
