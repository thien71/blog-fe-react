import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const SocialLinks = ({ className = "" }) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-blue-600 hover:text-blue-800 w-6 h-6" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-blue-400 hover:text-blue-600 w-6 h-6" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-blue-700 hover:text-blue-900 w-6 h-6" />
      </a>
    </div>
  );
};

export default SocialLinks;
