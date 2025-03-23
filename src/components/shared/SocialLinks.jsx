import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const defaultLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: FaFacebook,
    color: "text-blue-600",
    hoverColor: "hover:text-blue-800",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: FaTwitter,
    color: "text-blue-600",
    hoverColor: "hover:text-blue-400",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: FaLinkedin,
    color: "text-blue-600",
    hoverColor: "hover:text-blue-800",
  },
];

const SocialLinks = ({
  title = "",
  links = defaultLinks,
  className = "",
  classNameA = "",
  classNameSpan = "",
}) => {
  return (
    <div
      className={`flex flex-col items-start gap-3 border-b-2 pt-1 pb-4 text-title ${className}`}
    >
      {title || (
        <h3 className="text-center w-full text-base uppercase font-semibold">
          {title}
        </h3>
      )}
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${link.color} ${link.hoverColor} ${classNameA}`}
          >
            <Icon className="w-6 h-6" />
            <span className={`${classNameSpan}`}>{link.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
