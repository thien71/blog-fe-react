const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Mô tả */}
          <div>
            <h2 className="text-2xl font-bold text-white">MyBlog</h2>
            <p className="mt-2 text-gray-400">
              Chia sẻ kiến thức, kinh nghiệm và góc nhìn về công nghệ, lập trình
              và cuộc sống.
            </p>
          </div>

          {/* Điều hướng */}
          <div>
            <h3 className="text-lg font-semibold text-white">Danh mục</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Công nghệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Lập trình
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Đời sống
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Kinh nghiệm
                </a>
              </li>
            </ul>
          </div>

          {/* Kết nối & Theo dõi */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Theo dõi chúng tôi
            </h3>
            <div className="mt-3 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
