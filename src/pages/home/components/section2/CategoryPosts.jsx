import { Link } from "react-router-dom";
import { Divider, PostGridItem, PostInfo } from "../../../../components";

const CategoryPosts = () => {
  return (
    <div className="w-3/5 pl-8 border-l border-gray-300">
      {["Travel", "Food", "Life"].map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="relative inline-block text-title text-lg font-extrabold font-title leading-relaxed mb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary">
            <Link to={`/ ${category}`} alt={category} className="">
              {category}
            </Link>
          </h2>

          <div className="flex gap-4 flex-col">
            <div className="flex gap-4">
              <PostGridItem
                title="Ý tưởng sản xuất nhà lắp ghép để giải quyết chỗ ở tại Hawaiit"
                image="https://placehold.co/225x135"
                imgRatio="w-1/2"
                summary="Để giải quyết nhu cầu cho 29.000 người đang chờ có nhà, Hawaii (Mỹ) định sản xuất nhà lắp ghép để tiết kiệm chi ... "
                titleSize="text-base"
                className="w-2/3"
              />

              <PostInfo
                title={`Gỡ vướng 13 dự án du lịch trên bán đảo Sơn Trà, Đà Nẵng ${category}`}
                titleSize="text-base"
                summary={`13 dự án khu du lịch trên bán đảo Sơn Trà sẽ được áp dụng cơ chế, chính sách đặc thù để tháo gỡ khó ...  ${category}`}
                className={"w-1/3"}
              />
            </div>
            <Divider spacing="my-2" />
            <div className="flex justify-around">
              {[3, 4, 5].map((id) => (
                <h3 key={id} className="text-sm font-bold text-center">
                  Tiêu đề {category} {id}
                </h3>
              ))}
            </div>
            <Divider spacing="my-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default CategoryPosts;
