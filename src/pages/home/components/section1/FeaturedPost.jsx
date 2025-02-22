import { PostInfo } from "../../../../components";

const FeaturedPost = () => {
  return (
    <article className="flex gap-6">
      <img
        src="https://placehold.co/500x300"
        alt="Featured"
        className="w-2/3 max-w-lg max-h-80 block"
      />

      <PostInfo
        title="Man Utd thoát thua dù bị dẫn hai bàn"
        summary="Tuyệt phẩm của Bruno Fernandes giúp Man Utd cầm hòa Everton 2-2."
        link="/man-utd-thoat-thua"
        isUppercase
      />
    </article>
  );
};

export default FeaturedPost;
