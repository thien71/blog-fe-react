import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <header className="bg-white shadow fixed top-0 w-full z-10">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center py-2 px-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyLogo
        </Link>

        <Navbar />
      </div>
    </header>
  );
};

export default Header;
