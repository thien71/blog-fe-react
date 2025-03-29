import { useState, useEffect } from "react";
import PostAPI from "../../../apis/endpoints/posts";
import { PostItem, Divider } from "../../../components";
import { Link } from "react-router-dom";
import useFetchAPI from "../../../hooks/useFetchAPI";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostsSidebar = () => {
  const { data: posts, loading, error } = useFetchAPI(PostAPI.getPopular, [5]);

  if (loading)
    return (
      <div className="w-3/12">
        <Skeleton count={5} height={60} width="100%" className="mb-2" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <aside className="w-3/12 pl-0 hidden md:block text-title">
      <div className="sticky top-16">
        <h2 className="text-lg font-semibold mb-4 font-title">Top bài viết</h2>
        <div className="flex flex-col gap-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id}>
                <Link to={`/posts/${post.slug}`}>
                  <PostItem
                    key={post.id}
                    post={post}
                    layout="image-title"
                    imagePosition="left"
                    titleClass="text-sm font-normal line-clamp-4"
                  />
                  <Divider spacing="my-2" />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm"></p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default PostsSidebar;
