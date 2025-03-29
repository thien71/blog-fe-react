import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostAPI from "../../../../apis/endpoints/posts";
import useFetchAPI from "../../../../hooks/useFetchAPI";
import FeaturedPost from "./FeaturedPost";
import TopViewedPosts from "./TopViewedPosts";
import { Divider } from "../../../../components";

const Section1 = () => {
  const {
    data: featuredPostData,
    loading: loadingFeatured,
    error: errorFeatured,
  } = useFetchAPI(PostAPI.getLatest);

  const {
    data: topViewedPostsData,
    loading: loadingTopViewed,
    error: errorTopViewed,
  } = useFetchAPI(PostAPI.getPopular);

  const isLoading = loadingFeatured || loadingTopViewed;

  return (
    <section className="w-4/5">
      {loadingFeatured ? (
        <Skeleton height={200} />
      ) : errorFeatured ? (
        <p>Error: {errorFeatured}</p>
      ) : (
        <FeaturedPost data={featuredPostData} />
      )}

      {!isLoading && <Divider />}

      {loadingTopViewed ? (
        <div className="grid grid-cols-3 gap-4 my-6">
          <Skeleton height={150} width="100%" />
          <Skeleton height={150} width="100%" />
          <Skeleton height={150} width="100%" />
        </div>
      ) : errorTopViewed ? (
        <p>Error: {errorTopViewed}</p>
      ) : (
        <TopViewedPosts data={topViewedPostsData} />
      )}

      {!isLoading && <Divider />}
    </section>
  );
};

export default Section1;
