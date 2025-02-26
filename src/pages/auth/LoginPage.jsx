import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../apis/endpoints/auth";
import { GoEye, GoEyeClosed } from "react-icons/go";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AuthAPI.login({ email, password });
      const { access_token, user } = response.data.data;

      localStorage.setItem("authToken", access_token);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/author/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.data?.message ||
          "Tài khoản hoặc mật khẩu không chính xác!"
      );
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label className="block text-title mb-1 font-summary">Email</label>
          <input
            type="email"
            className="w-full px-3 py-3 text-title font-summary text-sm border-2 rounded-md"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-title mb-1 font-summary">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-3 text-title font-summary text-sm border-2 rounded-md pr-10"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-title"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <GoEyeClosed /> : <GoEye />}
            </button>
          </div>
        </div>

        {error ? (
          <p className="text-red-500 text-sm font-summary text-left">{error}</p>
        ) : (
          <p className="text-red-500 text-sm font-summary text-left min-h-5"></p>
        )}
        <div className="text-right">
          <a
            href="/forgot-password"
            className="text-summary font-summary text-sm hover:underline"
          >
            Quên mật khẩu
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
