import React, { useEffect, useState } from "react";
import { useDebounce } from "../../features/file-browser/hooks/useDebounce";
import { Input } from "./Input";
import { InputProps } from "./input.model";

export const DebouncedInput = ({
  onChange,
  onDebounceChange,
  ...rest
}: InputProps & { onDebounceChange: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    onDebounceChange(debouncedValue);
  }, [debouncedValue, onDebounceChange]);

  return <Input {...rest} onChange={handleChange} />;
};
