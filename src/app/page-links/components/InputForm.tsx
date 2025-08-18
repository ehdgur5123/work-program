"use client";

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
interface InputFormProps {
  label: string;
  data?: string[] | null;
  setter?: React.Dispatch<React.SetStateAction<string>>;
  handleValue: (value: string) => void;
}

export default function InputForm({
  label,
  data,
  setter,
  handleValue,
}: InputFormProps) {
  const [value, setValue] = useState("");
  const [hasInputClick, setHasInputClick] = useState(false);

  const handleClick = () => {
    setHasInputClick(!hasInputClick);
  };

  useEffect(() => {
    handleValue(value);
  }, [value]);

  return (
    <div className="flex items-center gap-2 min-h-12">
      <label htmlFor={label} className="w-20 text-2xl font-bold text-center">
        {label}
      </label>
      {hasInputClick ? (
        <input
          type="text"
          id={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-white p-2 border border-gray-300 rounded text-black"
        />
      ) : data ? (
        <Dropdown
          data={data}
          setter={setter}
          handleValue={(item) => setValue(item)}
        />
      ) : null}
      <button type="button">
        {!hasInputClick ? (
          <PlusCircleIcon
            className="size-6 cursor-pointer hover:text-gray-500 active:scale-95"
            onClick={handleClick}
          />
        ) : (
          <XCircleIcon
            className="size-6 cursor-pointer hover:text-gray-500 active:scale-95"
            onClick={handleClick}
          />
        )}
      </button>
    </div>
  );
}
