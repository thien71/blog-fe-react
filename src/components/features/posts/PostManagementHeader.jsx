import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { BsNewspaper } from "react-icons/bs";
import { Button } from "../../../components";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostManagementHeader = ({ title = "Quản lí bài viết" }) => {
  const [active, setActive] = useState(title);
  const navigate = useNavigate();

  const buttons = [
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
      path: "/admin/posts/create",
    },
  ];

  const handleClick = (btn) => {
    setActive(btn.label);
    navigate(btn.path);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{active}</h2>
      <div className="flex gap-4 w-1/2">
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
