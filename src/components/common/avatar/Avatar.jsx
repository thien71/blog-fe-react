import defaultAvatar from "../../../assets/images/default_avatar.jpg";

const Avatar = ({ src, alt }) => (
  <img
    src={src || defaultAvatar}
    alt={alt}
    className="w-10 h-10 rounded-full border mx-auto"
  />
);

export default Avatar;
