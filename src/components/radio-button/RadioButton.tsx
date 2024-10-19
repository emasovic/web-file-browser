import { RadioButtonProps } from "./radioButton";

export const RadioButton = ({
  label,
  name,
  value,
  checked,
  onChange,
  className = "",
}: RadioButtonProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor={value} className="ml-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
};
