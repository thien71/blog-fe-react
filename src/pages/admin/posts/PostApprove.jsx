import { useEffect, useState } from "react";
import PostAPI from "../../../apis/endpoints/posts";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import {
  Table,
  Pagination,
  PostSearchBar,
  Button,
  PostManagementHeader,
} from "../../../components";

import usePagination from "../../../hooks/usePagination";
import { TiTick } from "react-icons/ti";
import { IoIosRemoveCircle } from "react-icons/io";

const PostApprove = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [posts, setPosts] = useState([]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !categoryFilter || post.category.id === Number(categoryFilter);

    const matchesAuthor =
      !authorFilter || post.author.id === Number(authorFilter);

    return matchesSearch && matchesCategory && matchesAuthor;
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
      const response = await PostAPI.getPending();
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

  const handleApprove = async (id) => {
    try {
      await PostAPI.approve(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Lỗi khi duyệt bài:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await PostAPI.reject(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Lỗi khi từ chối bài:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <PostManagementHeader title="Duyệt bài" />

      <PostSearchBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        visibleFilters={{
          category: true,
          author: true,
        }}
      />

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
              <td className="border p-2 text-left max-w-sm min-w-80">
                <p className="line-clamp-2">{post.title}</p>
              </td>
              <td className="border p-2">{post.category.name}</td>
              <td className="border p-2 min-w-40">
                <p className="">{post.author.name}</p>
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
                    variant="danger"
                    className="border-blue-500 text-hover hover:bg-blue-200 block"
                    onClick={() => handleReject(post.id)}
                  >
                    <IoIosRemoveCircle size={24} />
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => handleApprove(post.id)}
                  >
                    <TiTick size={24} />
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
    </div>
  );
};

export default PostApprove;
