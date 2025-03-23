import { Link } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <Link
      to="/"
      className={`brightness-150 text-lg font-semibold text-nowrap text-primary font-title hover:opacity-80 hover:text-primary ${className}`}
    >
      Thiện đang thiếu nợ
    </Link>
  );
};

export default Logo;
