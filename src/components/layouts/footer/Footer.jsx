import { Link } from "react-router-dom";
import { Logo } from "../../common";
import { useCategory } from "../../../contexts/CategoryContext";

const Footer = () => {
  const { categories, loading, error } = useCategory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [[], [], []];
  categories.forEach((category, index) => {
    columns[index % 3].push(category);
  });

  return (
    <footer className="bg-title text-white py-10 border-t">
      <div className="container max-w-screen-xl mx-auto px-6">
        <div className="flex md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start w-4/12">
            <Logo
              className={"!text-3xl !font-bold text-primary brightness-150"}
            />
            <p className="mt-4">
              Chia sẻ kiến thức, kinh nghiệm và góc nhìn về những thứ tôi đã
              trải trong cuộc sống.
            </p>
          </div>

          <div className="flex flex-col items-center w-6/12">
            <h3 className="text-lg font-semibold brightness-150">Danh mục</h3>
            <div className="mt-2 flex space-x-8">
              {columns.map((column, colIndex) => (
                <ul key={colIndex} className="space-y-2">
                  {column.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/${category.name}`}
                        className="hover:text-hover"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center w-2/12">
            <h3 className="text-lg font-semibold brightness-150">
              Theo dõi chúng tôi
            </h3>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm text-[#f9f9f9]">
          © {new Date().getFullYear()} bản quyền thuộc{" "}
          <span className="text-primary brightness-150">
            Thiện đang trải đời.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
