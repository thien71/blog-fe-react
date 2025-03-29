import TagItem from "../../../../pages/post/components/TagItem";

const DetailPostTag = ({ tags, className }) => {
  if (!tags) return null;
  return (
    <div className={`flex items-center gap-8 pt-2 pb-4 border-b ${className}`}>
      <h5 className="text-sm font-medium text-secondary whitespace-nowrap">
        Tags:
      </h5>

      <ul className="flex flex-wrap gap-8 max-h-8">
        {tags.map((tag) => (
          <TagItem tag={tag} key={tag.id} />
        ))}
      </ul>
    </div>
  );
};

export default DetailPostTag;
