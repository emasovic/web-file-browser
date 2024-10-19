import { ButtonProps } from "./button.model";

export const Button = ({
  variant = "primary",
  onClick,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  const baseClasses = "px-4 py-2 font-semibold rounded focus:outline-none";
  const primaryClasses = "bg-blue-500 text-white hover:bg-blue-600";
  const secondaryClasses = "bg-gray-500 text-white hover:bg-gray-600";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const buttonClasses = `${baseClasses} ${
    variant === "primary" ? primaryClasses : secondaryClasses
  } ${disabled ? disabledClasses : ""} ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
