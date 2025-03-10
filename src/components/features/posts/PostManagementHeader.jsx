import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { BsNewspaper } from "react-icons/bs";
import { Button } from "../../../components";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostAPI from "../../../apis/endpoints/posts";
import { RiDraftLine } from "react-icons/ri";

const PostManagementHeader = ({ title = "Quản lí bài viết" }) => {
  const [active, setActive] = useState(title);
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Các bản nháp",
      icon: <RiDraftLine size={20} />,
      path: "/admin/posts/draft",
    },
    {
      label: "Duyệt bài",
      icon: <FaTasks size={20} />,
      path: "/admin/posts/approve",
    },
    {
      label: "Quản lí bài viết",
      icon: <BsNewspaper size={20} />,
      path: "/admin/posts",
    },
    {
      label: "Viết bài",
      icon: <FaPenToSquare size={20} />,
      // path: `/admin/posts/edit/${postId}`,
      isCreatePost: true,
    },
  ];

  const handleClick = async (btn) => {
    setActive(btn.label);

    if (btn.isCreatePost) {
      try {
        const response = await PostAPI.create({
          title: "",
        });
        const postId = response.data?.data?.id;

        navigate(`/admin/posts/edit/${postId}`);
      } catch (error) {
        console.error("Lỗi tạo bài viết:", error);
      }
    } else {
      navigate(btn.path);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{active}</h2>
      <div className="flex gap-4 w-2/3">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            variant={active === btn.label ? "primary" : "outline"}
            size="md"
            className="gap-3 flex-1"
            onClick={() => handleClick(btn)}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PostManagementHeader;
