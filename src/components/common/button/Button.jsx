import { FaSpinner } from "react-icons/fa";

const buttonVariants = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
  ghost: "bg-transparent text-gray-600 hover:bg-blue-100",
  icon: "p-2 bg-gray-100 rounded-full hover:bg-blue-200 bg-blue",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  icon: Icon,
  iconRight = false,
  disabled = false,
  fullWidth = false,
  loading = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center rounded-md font-medium transition
        ${buttonVariants[variant]} ${sizeClasses[size]} 
        ${fullWidth ? "w-full" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : (
        Icon && !iconRight && <Icon className="mr-2" />
      )}
      {children}
      {Icon && iconRight && <Icon className="ml-2" />}
    </button>
  );
};

export default Button;
