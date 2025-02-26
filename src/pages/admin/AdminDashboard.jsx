import { useState } from "react";
import { FaFileAlt, FaUsers, FaTags, FaList } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 120,
    totalUsers: 45,
    totalCategories: 8,
    totalTags: 15,
  });

  const [topPosts, setTopPosts] = useState([
    { title: "Cách học React hiệu quả", views: 2300, image: "react.jpg" },
    { title: "Hướng dẫn sử dụng Tailwind", views: 1950, image: "tailwind.jpg" },
    { title: "Cách viết bài chuẩn SEO", views: 1600, image: "seo.jpg" },
    { title: "Laravel 9 cho người mới", views: 1400, image: "laravel.jpg" },
    {
      title: "Tối ưu performance trong React",
      views: 1200,
      image: "performance.jpg",
    },
    { title: "Cách học React hiệu quả", views: 2300, image: "react.jpg" },
    { title: "Hướng dẫn sử dụng Tailwind", views: 1950, image: "tailwind.jpg" },
    { title: "Cách viết bài chuẩn SEO", views: 1600, image: "seo.jpg" },
    { title: "Laravel 9 cho người mới", views: 1400, image: "laravel.jpg" },
    {
      title: "Tối ưu performance trong React",
      views: 1200,
      image: "performance.jpg",
    },
  ]);

  const [recentPosts, setRecentPosts] = useState([
    {
      title: "React Server Components là gì?",
      date: "26/02/2025",
      image: "rsc.jpg",
    },
    {
      title: "Tại sao nên dùng Zustand thay vì Redux?",
      date: "25/02/2025",
      image: "zustand.jpg",
    },
    {
      title: "API caching trong Next.js",
      date: "24/02/2025",
      image: "nextjs.jpg",
    },
    {
      title: "Tại sao nên dùng Zustand thay vì Redux?",
      date: "25/02/2025",
      image: "zustand.jpg",
    },
    {
      title: "API caching trong Next.js",
      date: "24/02/2025",
      image: "nextjs.jpg",
    },
  ]);

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
      <StatCard
        icon={<FaFileAlt size={28} />}
        title="Bài viết"
        value={stats.totalPosts}
      />
      <StatCard
        icon={<FaUsers size={30} />}
        title="Người dùng"
        value={stats.totalUsers}
      />
      <StatCard
        icon={<FaList size={30} />}
        title="Danh mục"
        value={stats.totalCategories}
      />
      <StatCard
        icon={<FaTags size={30} />}
        title="Thẻ (Tags)"
        value={stats.totalTags}
      />
      <div className="col-span-full grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">
            Top 10 bài viết nhiều lượt xem
          </h2>
          <div className="space-y-2">
            {topPosts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Bài viết gần đây</h2>
          <div className="space-y-2">
            {recentPosts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg py-3 px-4 col-span-2">
        <h2 className="text-lg font-semibold mb-2">Tag phổ biến</h2>
        <TagCategoryList items={popularTags} />
      </div>

      <div className="bg-white shadow-md rounded-lg py-3 px-4 col-span-2">
        <h2 className="text-lg font-semibold mb-2">Danh mục phổ biến</h2>
        <TagCategoryList items={popularCategories} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white shadow-md rounded-lg px-4 py-2 flex items-center space-x-4">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

const PostItem = ({ post }) => (
  <div className="flex items-center bg-gray-100 p-2 rounded-lg">
    <div className="w-20 h-12 bg-gray-300 rounded-md" />
    <div className="ml-4">
      <p className="text-sm font-semibold">{post.title}</p>
      {post.views ? (
        <p className="text-xs text-gray-500">{post.views} lượt xem</p>
      ) : (
        <p className="text-xs text-gray-500">{post.date}</p>
      )}
    </div>
  </div>
);

const TagCategoryList = ({ items }) => (
  <div className="grid grid-cols-3 gap-2">
    {items.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
      >
        <span className="text-[15px]">{item.name}</span>
        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          {item.count}
        </span>
      </div>
    ))}
  </div>
);

export default AdminDashboard;
