import { Link } from "react-router-dom";

const TagItem = ({ tag, className }) => {
  return (
    <li key={tag.id} className={`group relative ${className}`}>
      <div className="relative px-4 py-[6px] bg-black flex items-center group-hover:bg-gray-700">
        <div
          className="absolute top-0 left-[-16px] border-y-[16px] border-r-[16px] border-transparent
     border-r-black group-hover:border-r-gray-700"
        ></div>
        <div className="absolute top-3 -left-1 rounded-full p-1 bg-white"></div>
        <Link
          to={`/search?tag=${encodeURIComponent(tag.name)}`}
          className="block text-white text-sm group-hover:text-white"
        >
          {tag.name}
        </Link>
      </div>
    </li>
  );
};

export default TagItem;
