const TagCategoryList = ({ items }) => {
  let count = 0;
  console.log("items render " + count++, items);
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
        >
          <span className="text-[15px]">{item.name}</span>
          <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
            {item.posts_count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TagCategoryList;
