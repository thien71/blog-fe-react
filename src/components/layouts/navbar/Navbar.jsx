import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useCategory } from "../../../contexts/CategoryContext";

const Navbar = ({ className }) => {
  const [search, setSearch] = useState("");
  const { categories, loading, error } = useCategory();
  const navigate = useNavigate();

  if (loading) return <p></p>;
  if (error) return <p>Error: {error}</p>;

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className={`flex items-center ${className}`}>
      <div className="overflow-x-auto flex-1 scrollbar-hidden min-w-0 px-2">
        <ul className="flex items-center space-x-6 flex-nowrap min-w-max ">
          {categories.map((item, index) => (
            <li key={index} className="text-nowrap">
              <Link
                to={`/search?category=${encodeURIComponent(item.name)}`}
                className="text-title"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex justify-between items-center border ml-4 pl-1 border-gray-300 rounded-lg min-w-64">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm"
          className="text-sm font-title placeholder:font-summary px-2 py-1 outline-none border-none w-24 transition"
        />
        <div className="inline-block mr-4 group hover:cursor-pointer p-1">
          <FaSearch className="group-hover:opacity-70 text-title" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
