import defaultAvatar from "../../../assets/images/default_avatar.jpg";

const Avatar = ({ src, alt, className = "" }) => (
  <img
    src={src || defaultAvatar}
    alt={alt}
    className={`w-10 h-10 rounded-full border mx-auto ${className}`}
  />
);

export default Avatar;
