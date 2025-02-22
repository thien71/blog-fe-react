import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Button from "../button/Button";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Travel", path: "/travel" },
  { name: "Food", path: "/food" },
  { name: "Life", path: "/life" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center space-x-6">
        {menuItems.map((item, index) => (
          <li className="">
            <Link
              key={index}
              to={item.path}
              className="text-gray-600 hover:text-blue-500"
            >
              {item.name}
            </Link>
          </li>
        ))}

        <Button
          variant="ghost"
          icon={FaSearch}
          className="p-2 rounded-full"
          aria-label="Search"
        />
      </ul>
    </nav>
  );
};

export default Navbar;
