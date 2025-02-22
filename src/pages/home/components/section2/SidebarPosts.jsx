import { Divider } from "../../../../components";

const SidebarPosts = () => {
  return (
    <aside className="w-2/5 max-w-md">
      {[1, 2, 3, 4].map((id) => (
        <div key={id} className="flex flex-col">
          <h3 className="text-title text-base font-bold font-title text-justify mb-2">
            Tiêu đề bài {id}
          </h3>
          <div className="flex gap-x-4">
            <div className="w-1/3">
              <img
                src="https://placehold.co/150x90"
                alt="Sidebar post"
                className="w-full"
              />
            </div>

            <p className="w-2/3 text-summary text-sm font-summary text-justify font-thin leading-relaxed">
              Tuyệt phẩm của Bruno Fernandes và Manuel Ugarte giúp Man Utd cầm
              hòa chủ nhà Everton 2-2, ở vòng 26 Ngoại hạng Anh.
            </p>
          </div>
          <Divider spacing="my-2" />
        </div>
      ))}
    </aside>
  );
};
export default SidebarPosts;
