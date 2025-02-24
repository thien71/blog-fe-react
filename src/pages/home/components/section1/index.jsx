import { Divider } from "../../../../components";
import FeaturedPost from "./FeaturedPost";
import TopViewedPosts from "./TopViewedPosts";

const Section1 = () => {
  return (
    <section className="w-4/5">
      <FeaturedPost />
      <Divider />
      <TopViewedPosts />
      <Divider />
    </section>
  );
};

export default Section1;
