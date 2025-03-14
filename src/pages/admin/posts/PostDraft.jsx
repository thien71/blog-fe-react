import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import PostAPI from "../../../apis/endpoints/posts";
import {
  Table,
  Pagination,
  Button,
  PostManagementHeader,
  Input,
} from "../../../components";

import { FiEdit } from "react-icons/fi";
import usePagination from "../../../hooks/usePagination";

const PostDraft = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const {
    currentPage: page,
    setCurrentPage: setPage,
    paginatedData: paginatedPosts,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPosts, 5);

  const fetchUsers = async () => {
    try {
      const response = await PostAPI.getDraft();
      if (response.data.data?.length) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải posts", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (postId) => {
    const userRole = localStorage.getItem("role");
    const basePath = userRole === "admin" ? "/admin" : "/author";
    navigate(`${basePath}/posts/edit/${postId}`);
  };

  // const handleEdit = () => {
  //   const userRole = localStorage.getItem("role");
  //   const basePath = userRole === "admin" ? "/admin" : "/author";
  //   navigate(`${basePath}/posts/edit/${paginatedPosts[page - 1].id}`);
  // };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <PostManagementHeader title="Các bản nháp" />

      <div className="grid grid-cols-5 gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm bài viết..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p>Không có bài viết nào</p>
        </div>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th className="border p-2">Id</th>
                <th className="border p-2">Ảnh</th>
                <th className="border p-2">Tiêu đề</th>
                <th className="border p-2">Danh mục</th>
                <th className="border p-2">Tác giả</th>
                <th className="border p-2">Ngày tạo</th>
                <th className="border p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr key={post.id} className="text-center">
                  <td className="border p-2">{post.id}</td>
                  <td className="border p-2 max-w-20">
                    <img
                      src={post.thumbnail || "https://placehold.co/80x48"}
                      alt={post.title}
                      className="aspect-[5/3] object-cover w-full bg-gray-300 rounded-md"
                    />
                  </td>
                  <td className="border p-2 text-left max-w-sm">
                    <p className="line-clamp-2">{post.title}</p>
                  </td>
                  <td className="border p-2">{post?.category?.name}</td>
                  <td className="border p-2 min-w-40">
                    <p className="">{post?.author?.name}</p>
                  </td>
                  <td className="border p-2 max-w-28">
                    <p className="">
                      {format(new Date(post.created_at), "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </td>

                  <td className="border p-2">
                    <div className="flex justify-center gap-4 items-center">
                      <Button
                        variant="outline"
                        className="border-blue-500 text-hover hover:bg-blue-200 block"
                        onClick={() => handleEdit(post.id)}
                      >
                        <FiEdit />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination
            total={totalItems}
            perPage={itemsPerPage}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default PostDraft;
