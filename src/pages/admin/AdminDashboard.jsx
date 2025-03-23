import { useEffect, useState } from "react";
import { FaFileAlt, FaUsers, FaTags, FaList } from "react-icons/fa";
import StatCard from "./components/StatCard";
import TagCategoryList from "./components/TagCategoryList";
import PostItem from "./components/PostItem";
import PostAPI from "../../apis/endpoints/posts";
import DashboardAPI from "../../apis/endpoints/dashboard";

const AdminDashboard = () => {
  const [dataSummary, setDataSummary] = useState({});
  const [topPosts, setTopPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, popularRes, latestRes] = await Promise.all([
          DashboardAPI.getSummary(3),
          PostAPI.getPopular(10),
          PostAPI.getLatest(5),
        ]);

        if (summaryRes.data) setDataSummary(summaryRes.data);
        if (popularRes.data.data?.length) setTopPosts(popularRes.data.data);
        if (latestRes.data.data?.length) setRecentPosts(latestRes.data.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>Error: {error.message || "An error occurred while loading data."}</p>
    );

  return (
    <div className="grid grid-cols-4 gap-3">
      <StatCard
        icon={<FaFileAlt size={28} />}
        title="Bài viết"
        value={dataSummary.totalPosts}
      />
      <StatCard
        icon={<FaUsers size={30} />}
        title="Người dùng"
        value={dataSummary.totalUsers}
      />
      <StatCard
        icon={<FaList size={30} />}
        title="Danh mục"
        value={dataSummary.totalCategories}
      />
      <StatCard
        icon={<FaTags size={30} />}
        title="Tags"
        value={dataSummary.totalTags}
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
        <TagCategoryList items={dataSummary?.popularCategories} />
      </div>

      <div className="bg-white shadow-md rounded-lg py-3 px-4 col-span-2">
        <h2 className="text-lg font-semibold mb-2">Tag phổ biến</h2>
        <TagCategoryList items={dataSummary?.popularTags} />
      </div>
    </div>
  );
};

export default AdminDashboard;
