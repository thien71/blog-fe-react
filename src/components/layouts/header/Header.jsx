import { Logo } from "../../../components";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <header className="bg-white shadow fixed top-0 w-full z-10 max-h-14">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center py-2 px-6 gap-16">
        <Logo className={"w-60"} />
        <Navbar className={"w-1/2"} />
      </div>
    </header>
  );
};

export default Header;
