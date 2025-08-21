"use client";

import { useEffect, useState, useRef } from "react";
import Dropdown from "./Dropdown";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
interface InputFormProps {
  label: string;
  data?: string[] | null;
  parentValue?: string;
  selectedValue?: string;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
  hasSubmit: boolean;
  handleValue: (value: string) => void;
}

export default function InputForm({
  label,
  data,
  selectedValue,
  setSelectedValue,
  hasSubmit,
  handleValue,
  parentValue,
}: InputFormProps) {
  const [value, setValue] = useState("");
  const [hasInputClick, setHasInputClick] = useState(false);

  useEffect(() => {
    handleValue(value);
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [hasInputClick, hasSubmit]);

  useEffect(() => {
    setValue("");
  }, [parentValue]);

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
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          handleValue={(item) => setValue(item)}
        />
      ) : null}
      <button type="button">
        {!hasInputClick ? (
          <PlusCircleIcon
            className="size-6 cursor-pointer hover:text-gray-500 active:scale-95"
            onClick={() => setHasInputClick(!hasInputClick)}
          />
        ) : (
          <XCircleIcon
            className="size-6 cursor-pointer hover:text-gray-500 active:scale-95"
            onClick={() => setHasInputClick(!hasInputClick)}
          />
        )}
      </button>
    </div>
  );
}
