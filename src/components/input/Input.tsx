import { InputProps } from "./input.model";

export const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  className = "",
  error = "",
  inputType = "primary",
  onChange,
}: InputProps) => {
  const baseClasses =
    "px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-all duration-200";
  const primaryClasses = "border-blue-500 focus:ring-blue-500";
  const secondaryClasses = "border-gray-500 focus:ring-gray-500";

  const inputClasses = `${baseClasses} ${
    inputType === "primary" ? primaryClasses : secondaryClasses
  } ${error ? "border-red-500" : ""} ${className}`;

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-semibold"> {label} </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
      />
      {error && <p className="text-red-500 text-sm mt-1"> {error} </p>}
    </div>
  );
};
