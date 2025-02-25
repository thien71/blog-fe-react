import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Divider } from "../index";

const SocialLinks = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col items-start gap-3 border-b-2 py-4 ${className}`}
    >
      <h3 className="text-title text-center w-full text-base uppercase font-semibold">
        Social links
      </h3>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <FaFacebook className="w-6 h-6" />
        <span className="text-title hover:text-blue-600">Facebook</span>
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-400 hover:text-blue-600"
      >
        <FaTwitter className="w-6 h-6" />
        <span className="text-title hover:text-blue-600">Twitter</span>
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
      >
        <FaLinkedin className="w-6 h-6" />
        <span className="text-title hover:text-blue-600">LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialLinks;
