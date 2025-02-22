const TopViewedPosts = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((id) => (
        <div
          key={id}
          className="flex justify-between items-center flex-col gap-2"
        >
          <h3 className="text-title text-md font-bold font-title text-center">
            Tiêu đề bài {id}
          </h3>
          <img
            src="https://placehold.co/250x150"
            alt="Top viewed"
            className="object-contain w-full"
          />
        </div>
      ))}
    </div>
  );
};
export default TopViewedPosts;
